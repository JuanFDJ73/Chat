import { useState } from 'react';
import './Register.css';

const Register = ({ onSwitchToLogin, onAnonymousLogin, onEmailRegister }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    // const [passwordStrength, setPasswordStrength] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validar en tiempo real
        // if (name === 'password') {
        //     checkPasswordStrength(value);
        // }

        // Limpiar errores cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // const checkPasswordStrength = (password) => {
    //     if (password.length === 0) {
    //         setPasswordStrength('');
    //         return;
    //     }

    //     let strength = 0;
    //     if (password.length >= 5) strength++;
    //     if (/[A-Z]/.test(password)) strength++;
    //     if (/[a-z]/.test(password)) strength++;
    //     if (/[0-9]/.test(password)) strength++;
    //     if (/[^A-Za-z0-9]/.test(password)) strength++;

    //     if (strength <= 2) setPasswordStrength('weak');
    //     else if (strength === 3) setPasswordStrength('fair');
    //     else if (strength === 4) setPasswordStrength('good');
    //     else setPasswordStrength('strong');
    // };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'El nombre es requerido';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El email no es válido';
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
            // } else if (formData.password.length < 5) {
            //     newErrors.password = 'La contraseña debe tener al menos 5 caracteres';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                await onEmailRegister({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password
                });
            } catch (error) {
                console.error('Error en registro:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <div className="register-header">
                    <h1 className="register-title">Crear cuenta</h1>
                    <p className="register-subtitle">Únete y comienza a chatear</p>
                </div>

                <form onSubmit={handleSubmit} className="register-inputs">
                    <div>
                        <input
                            className={`register-input ${errors.fullName ? 'error' : ''}`}
                            placeholder="Nombre completo"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                        {errors.fullName && <p className="register-error-message">{errors.fullName}</p>}
                    </div>

                    <div>
                        <input
                            className={`register-input ${errors.email ? 'error' : ''}`}
                            placeholder="Correo electrónico"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className="register-error-message">{errors.email}</p>}
                    </div>

                    <div>
                        <input
                            className={`register-input ${errors.password ? 'error' : ''}`}
                            placeholder="Contraseña"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p className="register-error-message">{errors.password}</p>}

                        {/* {formData.password && (
                            <div className="password-strength">
                                <div className="password-strength-bar">
                                    <div className={`password-strength-fill ${passwordStrength}`}></div>
                                </div>
                                <div className="password-requirements">
                                    <ul>
                                        <li className={formData.password.length >= 8 ? 'valid' : ''}>
                                            Al menos 8 caracteres
                                        </li>
                                        <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                                            Una letra mayúscula
                                        </li>
                                        <li className={/[a-z]/.test(formData.password) ? 'valid' : ''}>
                                            Una letra minúscula
                                        </li>
                                        <li className={/[0-9]/.test(formData.password) ? 'valid' : ''}>
                                            Un número
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )} */}
                    </div>

                    <div>
                        <input
                            className={`register-input ${errors.confirmPassword ? 'error' : ''}`}
                            placeholder="Confirmar contraseña"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        {errors.confirmPassword && <p className="register-error-message">{errors.confirmPassword}</p>}
                    </div>
                </form>

                <div className="register-buttons">
                    <button
                        onClick={handleSubmit}
                        className="register-signup-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                    </button>

                    <div className="register-divider">
                        <span>o</span>
                    </div>

                    <button onClick={onAnonymousLogin} className="auth-anonymous-btn" type="button">
                        Ingresar como anónimo
                    </button>
                </div>

                <div className="register-footer">
                    <p>¿Ya tienes una cuenta?
                    </p>
                    <button
                        onClick={onSwitchToLogin}
                        className="register-link"
                    >
                        Inicia sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
