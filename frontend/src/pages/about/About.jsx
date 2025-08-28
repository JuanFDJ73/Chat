import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowBackCircle, logoGithub, logoReact, logoNodejs, wifi, server, code, heart, chatbubbles, phonePortraitOutline, lockClosedOutline, invertModeOutline, colorPaletteOutline, chatbubbleEllipsesOutline, peopleOutline} from 'ionicons/icons';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import './About.css';

const About = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const technologies = [
        { name: 'React.js', icon: logoReact, description: t('reactDescription') },
        { name: 'Socket.io', icon: wifi, description: t('socketDescription') },
        { name: 'Node.js', icon: logoNodejs, description: t('nodeDescription') },
        { name: 'MongoDB', icon: server, description: t('mongoDescription') }
    ];

    return (
        <div className="about">
            <div className="about-container">
                <div className="about-header">
                    <button onClick={() => navigate('/Settings')} className="back-button">
                        <IonIcon className="icon-inner" icon={arrowBackCircle} />
                    </button>
                </div>

                <div className="about-content">
                    <div className="project-intro">
                        <div className="intro-icon">
                            <IonIcon icon={chatbubbles} />
                        </div>
                        <h2>{t('chatAppProject')}</h2>
                        <p className="intro-text">
                            {t('projectIntro')}
                        </p>
                    </div>

                    <div className="learning-objectives">
                        <h3>
                            <IonIcon icon={code} />
                            {t('learningObjectives')}
                        </h3>
                        <ul>
                            <li>{t('objective1')}</li>
                            <li>{t('objective2')}</li>
                            <li>{t('objective3')}</li>
                            <li>{t('objective4')}</li>
                            <li>{t('objective5')}</li>
                            <li>{t('objective6')}</li>
                        </ul>
                    </div>

                    <div className="technologies">
                        <h3>{t('technologiesImplemented')}</h3>
                        <div className="tech-grid">
                            {technologies.map((tech, index) => (
                                <div key={index} className="tech-card">
                                    <div className="tech-icon">
                                        <IonIcon icon={tech.icon} />
                                    </div>
                                    <h4>{tech.name}</h4>
                                    <p>{tech.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="features">
                        <h3>{t('featuresImplemented')}</h3>
                        <div className="features-list">
                            <div className="feature-item">
                                <IonIcon icon={chatbubbleEllipsesOutline} />
                                <span>{t('realtimeChat')}</span>
                            </div>
                            <div className="feature-item">
                                <IonIcon icon={lockClosedOutline} />
                                <span>{t('authSystem')}</span>
                            </div>
                            <div className="feature-item">
                                <IonIcon icon={phonePortraitOutline} />
                                <span>{t('responsiveDesign')}</span>
                            </div>
                            <div className="feature-item">
                                <IonIcon icon={invertModeOutline} />
                                <span>{t('darkLightMode')}</span>
                            </div>
                            <div className="feature-item">
                                <IonIcon icon={peopleOutline} />
                                <span>{t('contactManagement')}</span>
                            </div>
                            <div className="feature-item">
                                <IonIcon icon={colorPaletteOutline} />
                                <span>{t('modernInterface')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="developer-info">
                        <div className="developer-card">
                            <div className="developer-avatar">
                                <IonIcon icon={logoGithub} />
                            </div>
                            <div className="developer-details">
                                <h3>{t('developedWithLove')} <IonIcon icon={heart} className="heart-icon" /></h3>
                                <p>
                                    {t('developerMessage')}
                                </p>
                                <a
                                    href="https://github.com/JuanFDJ73"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="github-link"
                                >
                                    {t('viewGithub')}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="project-footer">
                        <p className="footer-text">
                            {t('thanksMessage')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;