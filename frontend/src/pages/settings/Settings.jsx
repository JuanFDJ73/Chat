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
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import './Settings.css';

const Settings = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [darkMode, setDarkMode] = useState(false);

    const handleNotification = () => {
        navigate('/Notifications');
    }

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    }

    const handleLanguage = () => {
        navigate('/Language');
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
                        <h1 className="settings-title">{t('settings')}</h1>
                    </div>

                        {/* Modo Oscuro */}
                        <div className="settings-item">
                            <div className="settings-item-content">
                                <div className="settings-item-icon">
                                    <IonIcon icon={moon} />
                                </div>
                                <div className="settings-item-text">
                                    <h3 className="settings-item-title">{t('darkMode')}</h3>
                                    <p className="settings-item-subtitle">{t('changeTheme')}</p>
                                </div>
                            </div>
                            <div className="dark-toggle" onClick={toggleDarkMode}>
                                <div className="circle">
                                    <IonIcon className={`icon sun ${darkMode ? "hidden" : ""}`} icon={sunnyOutline} />
                                    <IonIcon className={`icon moon ${darkMode ? "" : "hidden"}`} icon={moonOutline} />
                                </div>
                            </div>
                        </div>

                    <div className="settings-list">
                        {/* Notificaciones */}
                        <div className="settings-item" onClick={handleNotification}>
                            <div className="settings-item-content">
                                <div className="settings-item-icon">
                                    <IonIcon icon={notifications} />
                                </div>
                                <div className="settings-item-text">
                                    <h3 className="settings-item-title">{t('notifications')}</h3>
                                    <p className="settings-item-subtitle">{t('receiveNotifications')}</p>
                                </div>
                                <button className="nav-button" onClick={handleAbout}>
                                    <IonIcon icon={chevronForward} />
                                </button>
                            </div>
                        </div>

                        {/* Idioma */}
                        <div className="settings-item" onClick={handleLanguage}>
                            <div className="settings-item-content">
                                <div className="settings-item-icon">
                                    <IonIcon icon={language} />
                                </div>
                                <div className="settings-item-text">
                                    <h3 className="settings-item-title">{t('languageSettings')}</h3>
                                    <p className="settings-item-subtitle">{t('changeLanguage')}</p>
                                </div>
                            </div>
                            <div className="settings-item-action">
                                <button className="nav-button" onClick={handleLanguage}>
                                    <IonIcon icon={chevronForward} />
                                </button>
                            </div>
                        </div>

                        {/* Privacidad */}
                        <div className="settings-item" onClick={handlePrivacySettings}>
                            <div className="settings-item-content">
                                <div className="settings-item-icon">
                                    <IonIcon icon={lockClosed} />
                                </div>
                                <div className="settings-item-text">
                                    <h3 className="settings-item-title">{t('privacy')}</h3>
                                    <p className="settings-item-subtitle">{t('privacySettings')}</p>
                                </div>
                            </div>
                            <div className="settings-item-action">
                                <button className="nav-button" onClick={handlePrivacySettings}>
                                    <IonIcon icon={chevronForward} />
                                </button>
                            </div>
                        </div>

                        {/* Acerca de */}
                        <div className="settings-item" onClick={handleAbout}>
                            <div className="settings-item-content">
                                <div className="settings-item-icon">
                                    <IonIcon icon={informationCircle} />
                                </div>
                                <div className="settings-item-text">
                                    <h3 className="settings-item-title">{t('about')}</h3>
                                    <p className="settings-item-subtitle">{t('appInfo')}</p>
                                </div>
                            </div>
                            <div className="settings-item-action">
                                <button className="nav-button" onClick={handleAbout}>
                                    <IonIcon icon={chevronForward} />
                                </button>
                            </div>
                        </div>

                        {/* Ayuda */}
                        <div className="settings-item" onClick={handleHelp}>
                            <div className="settings-item-content">
                                <div className="settings-item-icon">
                                    <IonIcon icon={helpCircle} />
                                </div>
                                <div className="settings-item-text">
                                    <h3 className="settings-item-title">{t('help')}</h3>
                                    <p className="settings-item-subtitle">{t('helpCenter')}</p>
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
                        <p className="version-text">{t('version')} 1.0.0</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;