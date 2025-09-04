import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { 
    arrowBackCircle, 
    helpCircleOutline, 
    mailOutline, 
    chatbubbleEllipsesOutline,
    documentTextOutline,
    shieldCheckmarkOutline,
    constructOutline,
    chevronForward,
    sendOutline,
} from 'ionicons/icons';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import './Help.css';

const Help = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [feedbackText, setFeedbackText] = useState('');
    const [feedbackSent, setFeedbackSent] = useState(false);
    const [activeSection, setActiveSection] = useState('main');

    const handleSendFeedback = () => {
        // if (feedbackText.trim()) {
            
        //     setFeedbackSent(true);
        //     setFeedbackText('');
            
        //     setTimeout(() => {
        //         setFeedbackSent(false);
        //     }, 3000);
        // }
        alert('Inhabilitado temporalmente...');
    };

    const handleContactDeveloper = () => {
        alert('Inhabilitado temporalmente...');
    };

    const renderMainMenu = () => (
        <>
            {/* Preguntas Frecuentes */}
            <div className="help-section">
                <h2 className="section-title">
                    <IonIcon icon={helpCircleOutline} />
                    {t('frequentQuestions')}
                </h2>
                <button 
                    className="help-item"
                    onClick={() => setActiveSection('faq')}
                >
                    <div className="help-item-content">
                        <IonIcon icon={helpCircleOutline} className="help-item-icon" />
                        <span>{t('frequentQuestions')}</span>
                    </div>
                    <IonIcon icon={chevronForward} className="chevron" />
                </button>
            </div>

            {/* Solución de problemas */}
            <div className="help-section">
                <h2 className="section-title">
                    <IonIcon icon={constructOutline} />
                    {t('troubleshooting')}
                </h2>
                <button 
                    className="help-item"
                    onClick={() => setActiveSection('troubleshooting')}
                >
                    <div className="help-item-content">
                        <IonIcon icon={constructOutline} className="help-item-icon" />
                        <span>{t('troubleshooting')}</span>
                    </div>
                    <IonIcon icon={chevronForward} className="chevron" />
                </button>
            </div>

            {/* Contacto */}
            <div className="help-section">
                <h2 className="section-title">
                    <IonIcon icon={mailOutline} />
                    {t('contactUs')}
                </h2>
                <button 
                    className="help-item"
                    onClick={handleContactDeveloper}
                >
                    <div className="help-item-content">
                        <IonIcon icon={mailOutline} className="help-item-icon" />
                        <span>{t('contactUs')}</span>
                    </div>
                    <IonIcon icon={chevronForward} className="chevron" />
                </button>
                
                <button 
                    className="help-item"
                    // onClick={() => setActiveSection('feedback')}
                    onClick={handleSendFeedback}
                >
                    <div className="help-item-content">
                        <IonIcon icon={chatbubbleEllipsesOutline} className="help-item-icon" />
                        <span>{t('sendFeedback')}</span>
                    </div>
                    <IonIcon icon={chevronForward} className="chevron" />
                </button>
            </div>

            {/* Términos y condiciones */}
            <div className="help-section">
                <h2 className="section-title">
                    <IonIcon icon={documentTextOutline} />
                    {t('termsConditions')}
                </h2>
                <button 
                    className="help-item"
                    onClick={() => setActiveSection('terms')}
                >
                    <div className="help-item-content">
                        <IonIcon icon={documentTextOutline} className="help-item-icon" />
                        <span>{t('termsConditions')}</span>
                    </div>
                    <IonIcon icon={chevronForward} className="chevron" />
                </button>
                
                <button 
                    className="help-item"
                    onClick={() => setActiveSection('privacy')}
                >
                    <div className="help-item-content">
                        <IonIcon icon={shieldCheckmarkOutline} className="help-item-icon" />
                        <span>{t('privacyPolicy')}</span>
                    </div>
                    <IonIcon icon={chevronForward} className="chevron" />
                </button>
            </div>
        </>
    );

    const renderFAQ = () => (
        <div className="faq-section">
            <div className="faq-item">
                <h3 className="faq-question">{t('faqQuestion1')}</h3>
                <p className="faq-answer">{t('faqAnswer1')}</p>
            </div>
            <div className="faq-item">
                <h3 className="faq-question">{t('faqQuestion2')}</h3>
                <p className="faq-answer">{t('faqAnswer2')}</p>
            </div>
            <div className="faq-item">
                <h3 className="faq-question">{t('faqQuestion3')}</h3>
                <p className="faq-answer">{t('faqAnswer3')}</p>
            </div>
            <div className="faq-item">
                <h3 className="faq-question">{t('faqQuestion4')}</h3>
                <p className="faq-answer">{t('faqAnswer4')}</p>
            </div>
        </div>
    );

    const renderTroubleshooting = () => (
        <div className="troubleshooting-section">
            <div className="problem-item">
                <h3 className="problem-title">{t('problem1')}</h3>
                <p className="solution-text">{t('solution1')}</p>
            </div>
            <div className="problem-item">
                <h3 className="problem-title">{t('problem2')}</h3>
                <p className="solution-text">{t('solution2')}</p>
            </div>
            <div className="problem-item">
                <h3 className="problem-title">{t('problem3')}</h3>
                <p className="solution-text">{t('solution3')}</p>
            </div>
        </div>
    );

    const renderFeedback = () => (
        <div className="feedback-section">
            <p className="feedback-description">{t('feedbackDescription')}</p>
            <textarea
                className="feedback-textarea"
                placeholder={t('feedbackPlaceholder')}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={6}
            />
            <button 
                className="feedback-button"
                onClick={handleSendFeedback}
                disabled={!feedbackText.trim()}
            >
                <IonIcon icon={sendOutline} />
                {t('sendFeedbackBtn')}
            </button>
            {feedbackSent && (
                <div className="feedback-success">
                    {t('feedbackSent')}
                </div>
            )}
        </div>
    );

    const renderTerms = () => (
        <div className="terms-section">
            <div className="terms-content">
                <p className="terms-text">{t('termsContent1')}</p>
                <p className="terms-text">{t('termsContent2')}</p>
                <p className="terms-text">{t('termsContent3')}</p>
                <p className="terms-text">{t('termsContent4')}</p>
            </div>
        </div>
    );

    const renderPrivacy = () => (
        <div className="privacy-section">
            <div className="privacy-content">
                <div className="privacy-item">
                    <p className="privacy-text">{t('privacyContent1')}</p>
                </div>
                <div className="privacy-item">
                    <h4 className="privacy-subtitle">{t('dataCollection')}</h4>
                    <p className="privacy-text">{t('privacyContent2')}</p>
                </div>
                <div className="privacy-item">
                    <h4 className="privacy-subtitle">{t('dataSecurity')}</h4>
                    <p className="privacy-text">{t('privacyContent3')}</p>
                </div>
                <div className="privacy-item">
                    <h4 className="privacy-subtitle">{t('authentication')}</h4>
                    <p className="privacy-text">{t('privacyContent6')}</p>
                </div>
                <div className="privacy-item">
                    <h4 className="privacy-subtitle">{t('messageStorage')}</h4>
                    <p className="privacy-text">{t('privacyContent5')}</p>
                </div>
                <div className="privacy-item">
                    <h4 className="privacy-subtitle">{t('noTracking')}</h4>
                    <p className="privacy-text">{t('privacyContent7')}</p>
                </div>
                <div className="privacy-item">
                    <h4 className="privacy-subtitle">{t('userRights')}</h4>
                    <p className="privacy-text">{t('privacyContent4')}</p>
                </div>
                <div className="privacy-item privacy-agreement">
                    <p className="privacy-text agreement-text">{t('privacyContent8')}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="help">
            <div className="help-container">
                <div className="help-header">
                    <button 
                        onClick={() => activeSection === 'main' ? navigate('/Settings') : setActiveSection('main')} 
                        className="back-button"
                    >
                        <IonIcon className="back-icon" icon={arrowBackCircle} />
                    </button>
                    <h1 className="help-title">
                        {activeSection === 'main' && t('helpTitle')}
                        {activeSection === 'faq' && t('frequentQuestions')}
                        {activeSection === 'troubleshooting' && t('troubleshootingTitle')}
                        {activeSection === 'feedback' && t('feedbackTitle')}
                        {activeSection === 'terms' && t('termsTitle')}
                        {activeSection === 'privacy' && t('privacyTitle')}
                    </h1>
                </div>

                <div className="help-content">
                    {activeSection === 'main' && renderMainMenu()}
                    {activeSection === 'faq' && renderFAQ()}
                    {activeSection === 'troubleshooting' && renderTroubleshooting()}
                    {activeSection === 'feedback' && renderFeedback()}
                    {activeSection === 'terms' && renderTerms()}
                    {activeSection === 'privacy' && renderPrivacy()}
                </div>
            </div>
        </div>
    );
};

export default Help;