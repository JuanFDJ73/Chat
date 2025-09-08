import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowBackCircle, checkmarkCircle, languageOutline, chatbubbles, person } from 'ionicons/icons';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import './Language.css';

const Language = () => {
    const navigate = useNavigate();
    const { currentLanguage, changeLanguage, t, getLanguageInfo, isLoading, availableLanguages } = useLanguage();
    const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

    // Sincronizar selectedLanguage con currentLanguage
    useEffect(() => {
        setSelectedLanguage(currentLanguage);
    }, [currentLanguage]);

    const handleLanguageSelect = async (langCode) => {
        setSelectedLanguage(langCode);
        await changeLanguage(langCode);
    };

    const languages = [
        { code: 'es', flag: '🇪🇸', name: 'Español', nativeName: 'Español' },
        { code: 'en', flag: '🇺🇸', name: 'English', nativeName: 'English' },
        { code: 'fr', flag: '🇫🇷', name: 'Français', nativeName: 'Français' },
        { code: 'pt', flag: '🇧🇷', name: 'Português', nativeName: 'Português' }
    ];

    return (
        <div className="language">
            <div className="language-container">
                {/* Header */}
                <div className="language-header">
                    <button onClick={() => navigate('/Settings')} className="back-button">
                        <IonIcon className="back-icon" icon={arrowBackCircle} />
                    </button>
                    <h1 className="language-title">
                        <IonIcon icon={languageOutline} className="title-icon" />
                        {t('languageSettings')}
                    </h1>
                </div>

                <div className="language-content">
                    {/* Current Language Info */}
                    <div className="current-language-info">
                        <div className="current-lang-badge">
                            <span className="current-flag">{getLanguageInfo(currentLanguage)?.flag}</span>
                            <div className="current-lang-text">
                                <span className="current-label">{t('currentLanguage')}</span>
                                <span className="current-name">{getLanguageInfo(currentLanguage)?.nativeName}</span>
                            </div>
                        </div>
                    </div>

                    {/* Language Selection */}
                    <div className="language-selection">
                        <h3 className="selection-title">{t('selectLanguage')}</h3>
                        <div className="languages-grid">
                            {languages.map((lang) => (
                                <div
                                    key={lang.code}
                                    className={`language-option ${selectedLanguage === lang.code ? 'selected' : ''} ${isLoading && selectedLanguage === lang.code ? 'loading' : ''}`}
                                    onClick={() => handleLanguageSelect(lang.code)}
                                >
                                    <div className="lang-flag">{lang.flag}</div>
                                    <div className="lang-info">
                                        <span className="lang-name">{lang.nativeName}</span>
                                        <span className="lang-english">{lang.name}</span>
                                    </div>
                                    <div className="lang-status">
                                        {selectedLanguage === lang.code && (
                                            <>
                                                {isLoading ? (
                                                    <div className="loading-spinner"></div>
                                                ) : (
                                                    <IonIcon icon={checkmarkCircle} className="check-icon" />
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="language-preview">
                        <h3 className="preview-title">
                            <IonIcon icon={chatbubbles} />
                            {t('preview')}
                        </h3>
                        <p className="preview-description">{t('previewText')}</p>
                        <div className="settings-menu-preview">
                            <div className="settings-item-preview">{t('profile')}</div>
                            <div className="settings-item-preview">{t('notifications')}</div>
                            <div className="settings-item-preview">{t('privacy')}</div>
                            <div className="settings-item-preview current">{t('languageSettings')}</div>
                            <div className="settings-item-preview">{t('about')}</div>
                            <div className="settings-item-preview">{t('help')}</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Language;