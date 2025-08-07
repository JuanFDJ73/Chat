import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../../firebase.config.js";

const provider = new GoogleAuthProvider();

const useAuthStore = create((set) => {
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
            } else {
                set({
                    userLogged: null,
                    isLoading: false,
                });
            }
        });
        return unsubscribe;
    };

    observeAuthState();

    return {
        userLogged: null,
        isLoading: true,

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
                set({ userLogged: null });
            } catch (error) {
                console.error("Error during logout:", error.message);
            }
        },
    };
});

export default useAuthStore;