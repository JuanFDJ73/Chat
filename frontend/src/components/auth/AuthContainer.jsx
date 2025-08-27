import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm.jsx';
import Register from './Register.jsx';
import useAuthStore from '../../stores/use-auth-store.js';

const AuthContainer = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { loginWithPopup } = useAuthStore();
    const navigate = useNavigate();

    const switchToRegister = () => {
        setIsLoginMode(false);
    };

    const switchToLogin = () => {
        setIsLoginMode(true);
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithPopup();
            // Después del login exitoso, redirigir a home
            navigate('/');
        } catch (error) {
            console.error('Error en login con Google:', error);
        }
    };

    const handleEmailLogin = async (email, password) => {
        try {
            // Aquí iría la lógica de login con email/password
            console.log('Login con email:', { email, password });
            alert('Interfaz Login en prueba');
        } catch (error) {
            console.error('Error en login con email:', error);
        }
    };

    const handleEmailRegister = async (userData) => {
        try {
            // Aquí iría la lógica de registro con email/password
            console.log('Registro con email:', userData);
            alert('Interfaz Registro en prueba');
        } catch (error) {
            console.error('Error en registro:', error);
        }
    };

    const handleAnonymousLogin = () => {
        try {
            // Aquí iría la lógica de login anónimo
            console.log('Login anónimo');
            alert('Interfaz Login Anónimo en prueba');
        } catch (error) {
            console.error('Error en login anónimo:', error);
        }
    };

    return (
        <>
            {isLoginMode ? (
                <AuthForm 
                    loginWithPopup={handleGoogleLogin}
                    onEmailLogin={handleEmailLogin}
                    onAnonymousLogin={handleAnonymousLogin}
                    onSwitchToRegister={switchToRegister}
                />
            ) : (
                <Register 
                    loginWithPopup={handleGoogleLogin}
                    onAnonymousLogin={handleAnonymousLogin}
                    onSwitchToLogin={switchToLogin}
                />
            )}
        </>
    );
};

export default AuthContainer;
