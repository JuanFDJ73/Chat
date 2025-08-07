import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import {
    arrowBackCircle,
    notifications,
    moon,
    language,
    lockClosed,
    informationCircle,
    helpCircle,
    chevronForward,
    sunnyOutline,
    moonOutline
} from 'ionicons/icons';
import './Settings.css';

const Settings = () => {
    const navigate = useNavigate();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const handleNotificationToggle = (e) => {
        setNotificationsEnabled(e.target.checked);
        console.log(`Notificaciones ${e.target.checked ? 'activadas' : 'desactivadas'}`);
    }

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    }

    const handleLanguage = () => {
        console.log('Boton de idioma presionado');
    }

    const handlePrivacySettings = () => {
        navigate('/Privacy');
    }

    const handleAbout = () => {
        navigate('/About');
    }

    const handleHelp = () => {
        navigate('/Help');
    }

    return (
        <div className="Settings">
            <div className="Settings-container">
                <div className="settings-content">
                    <div className="settings-header">
                        <button onClick={() => navigate('/')} className="back-button">
                            <IonIcon className="back-icon" icon={arrowBackCircle} />
                        </button>
                        <h1 className="settings-title">Configuración</h1>
                    </div>

                    <div className="settings-list">
                        {/* Notificaciones */}
                        <div className="settings-item">
                            <div className="settings-item-content">
                                <div className="settings-item-icon">
                                    <IonIcon icon={notifications} />
                                </div>
                                <div className="settings-item-text">
                                    <h3 className="settings-item-title">Notificaciones</h3>
                                    <p className="settings-item-subtitle">Recibir notificaciones de mensajes</p>
                                </div>
                            </div>
                            <div className="settings-item-action">
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={notificationsEnabled}
                                        onChange={handleNotificationToggle}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>

                        {/* Modo Oscuro */}
                        <div className="settings-item">
                            <div className="settings-item-content">
                                <div className="settings-item-icon">
                                    <IonIcon icon={moon} />
                                </div>
                                <div className="settings-item-text">
                                    <h3 className="settings-item-title">Modo Oscuro</h3>
                                    <p className="settings-item-subtitle">Cambiar tema de la aplicación</p>
                                </div>
                            </div>
                            <div className="dark-toggle" onClick={toggleDarkMode}>
                                <div className="circle">
                                    <IonIcon className={`icon sun ${darkMode ? "hidden" : ""}`} icon={sunnyOutline} />
                                    <IonIcon className={`icon moon ${darkMode ? "" : "hidden"}`} icon={moonOutline} />
                                </div>
                            </div>
                        </div>

                        {/* Idioma */}
                        <div className="settings-item">
                            <div className="settings-item-content">
                                <div className="settings-item-icon">
                                    <IonIcon icon={language} />
                                </div>
                                <div className="settings-item-text">
                                    <h3 className="settings-item-title">Idioma</h3>
                                    <p className="settings-item-subtitle">Cambiar idioma de la aplicación</p>
                                </div>
                            </div>
                            <div className="settings-item-action">
                                <button className="nav-button" onClick={handleLanguage}>
                                    <IonIcon icon={chevronForward} />
                                </button>
                            </div>
                        </div>

                        {/* Privacidad */}
                        <div className="settings-item">
                            <div className="settings-item-content">
                                <div className="settings-item-icon">
                                    <IonIcon icon={lockClosed} />
                                </div>
                                <div className="settings-item-text">
                                    <h3 className="settings-item-title">Privacidad</h3>
                                    <p className="settings-item-subtitle">Configuración de privacidad</p>
                                </div>
                            </div>
                            <div className="settings-item-action">
                                <button className="nav-button" onClick={handlePrivacySettings}>
                                    <IonIcon icon={chevronForward} />
                                </button>
                            </div>
                        </div>

                        {/* Acerca de */}
                        <div className="settings-item">
                            <div className="settings-item-content">
                                <div className="settings-item-icon">
                                    <IonIcon icon={informationCircle} />
                                </div>
                                <div className="settings-item-text">
                                    <h3 className="settings-item-title">Acerca de</h3>
                                    <p className="settings-item-subtitle">Información de la aplicación</p>
                                </div>
                            </div>
                            <div className="settings-item-action">
                                <button className="nav-button" onClick={handleAbout}>
                                    <IonIcon icon={chevronForward} />
                                </button>
                            </div>
                        </div>

                        {/* Ayuda */}
                        <div className="settings-item">
                            <div className="settings-item-content">
                                <div className="settings-item-icon">
                                    <IonIcon icon={helpCircle} />
                                </div>
                                <div className="settings-item-text">
                                    <h3 className="settings-item-title">Ayuda</h3>
                                    <p className="settings-item-subtitle">Centro de ayuda y soporte</p>
                                </div>
                            </div>
                            <div className="settings-item-action">
                                <button className="nav-button" onClick={handleHelp}>
                                    <IonIcon icon={chevronForward} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="settings-footer">
                        <p className="version-text">Versión 1.0.0</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;