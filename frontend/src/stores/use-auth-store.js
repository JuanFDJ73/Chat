import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../../firebase.config.js";

const provider = new GoogleAuthProvider();

const useAuthStore = create((set) => {
    const observeAuthState = () => {

        set({ isLoading: true });

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
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