import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../../firebase.config.js";

const provider = new GoogleAuthProvider();

const useAuthStore = create((set) => {
    const observeAuthState = () => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user ? set({ userLogged: user }) : set({ userLogged: null });
        });
        return unsubscribe;
    };
    observeAuthState();

    return {
        userLogged: null,
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