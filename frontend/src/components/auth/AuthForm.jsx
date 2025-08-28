import { useState } from 'react';
import './AuthForm.css';

const AuthForm = ({ loginWithPopup, onEmailLogin, onAnonymousLogin, onSwitchToRegister }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar errores cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El email no es válido';
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                await onEmailLogin(formData.email, formData.password);
            } catch (error) {
                console.error('Error en login:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="auth-header">
                    <h1 className="auth-title">Iniciar sesión</h1>
                    <p className="auth-subtitle">Ingresa a tu cuenta para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-inputs">
                    <div>
                        <input
                            className={`auth-input ${errors.email ? 'error' : ''}`}
                            placeholder="Correo electrónico"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className="auth-error-message">{errors.email}</p>}
                    </div>

                    <div>
                        <input
                            className={`auth-input ${errors.password ? 'error' : ''}`}
                            placeholder="Contraseña"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p className="auth-error-message">{errors.password}</p>}
                    </div>
                </form>

                <div className="auth-buttons">
                    <button
                        onClick={handleSubmit}
                        className="auth-login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>

                    <div className="auth-divider">
                        <span>o</span>
                    </div>

                    <button onClick={loginWithPopup} className="gsi-material-button" type="button">
                        <div className="gsi-material-button-state"></div>
                        <div className="gsi-material-button-content-wrapper">
                            <div className="gsi-material-button-icon">
                                <svg
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    style={{ display: 'block' }}
                                >
                                    <path
                                        fill="#EA4335"
                                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                    ></path>
                                    <path
                                        fill="#4285F4"
                                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                    ></path>
                                    <path
                                        fill="#FBBC05"
                                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                    ></path>
                                    <path
                                        fill="#34A853"
                                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                    ></path>
                                    <path fill="none" d="M0 0h48v48H0z"></path>
                                </svg>
                            </div>
                            <span className="gsi-material-button-contents">
                                Continuar con Google
                            </span>
                        </div>
                    </button>

                    <button onClick={onAnonymousLogin} className="auth-anonymous-btn" type="button">
                        Ingresar como anónimo
                    </button>
                </div>

                <div className="auth-footer">
                    <p>¿No tienes una cuenta?
                    </p>
                    <button
                        onClick={onSwitchToRegister}
                        className="auth-link"
                        type="button"
                    >
                        Regístrate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
