import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../../firebase.config.js";

const provider = new GoogleAuthProvider();

const useAuthStore = create((set, get) => {
    // Función para cargar perfil de BD
    const loadUserProfile = async (uid) => {
        try {
            const userApi = (await import('../services/api/users.js')).default;
            
            const [displayNameData, profileImageData, descriptionData] = await Promise.all([
                userApi.getDisplayName(uid).catch(() => ({ displayName: null })),
                userApi.getProfileImage(uid).catch(() => ({ photoURL: null })),
                userApi.getDescription(uid).catch(() => ({ description: null }))
            ]);

            const profile = {
                displayName: displayNameData.displayName,
                photoURL: profileImageData.photoURL,
                description: descriptionData.description
            };

            set({ userProfile: profile });
            return profile;
        } catch (error) {
            console.error('Error cargando perfil:', error);
            return null;
        }
    };

    const observeAuthState = () => {

        set({ isLoading: true });

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log('Usuario Firebase detectado:', user); // Debug
                try {
                    // Crear o registrar usuario en MongoDB automáticamente
                    console.log('Enviando datos a MongoDB:', {
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL
                    }); // Debug

                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            uid: user.uid,
                            displayName: user.displayName,
                            email: user.email,
                            photoURL: user.photoURL
                        })
                    });

                    console.log('Status de respuesta:', response.status); // Debug
                    
                    if (response.ok) {
                        const mongoUser = await response.json();
                        console.log('Usuario creado/actualizado en MongoDB:', mongoUser);
                    } else {
                        const errorText = await response.text();
                        console.error('Error al crear usuario en MongoDB:', response.status, errorText);
                    }
                } catch (error) {
                    console.error('Error al conectar con el backend:', error);
                }

                // Usar el UID real de Firebase
                const userData = {
                    ...user,
                    uid: user.uid
                };
                set({
                    userLogged: userData,
                    isLoading: false,
                });

                // Cargar perfil de la BD después de login
                loadUserProfile(user.uid);
            } else {
                set({
                    userLogged: null,
                    userProfile: null,
                    isLoading: false,
                });
            }
        });
        return unsubscribe;
    };

    observeAuthState();

    return {
        userLogged: null,
        userProfile: null, // Agregar datos de perfil de la BD
        isLoading: true,

        // Función para actualizar perfil local
        updateUserProfile: (updates) => {
            set((state) => ({
                userProfile: { ...state.userProfile, ...updates }
            }));
        },

        // Función para recargar perfil
        loadUserProfile,

        loginWithPopup: async () => {
            try {
                await signInWithPopup(auth, provider);
            } catch (error) {
                console.error("Error during login with popup:", error.message);
            }
        },

        logout: async () => {
            try {
                await signOut(auth);
                set({ userLogged: null, userProfile: null });
            } catch (error) {
                console.error("Error during logout:", error.message);
            }
        },
    };
});

export default useAuthStore;