import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowBackCircle, logoGithub, logoReact, logoNodejs, wifi, server, code, heart, chatbubbles, phonePortraitOutline, lockClosedOutline, invertModeOutline, colorPaletteOutline, chatbubbleEllipsesOutline, peopleOutline} from 'ionicons/icons';
import './About.css';

const About = () => {
    const navigate = useNavigate();

    const technologies = [
        { name: 'React.js', icon: logoReact, description: 'Frontend moderno con hooks y componentes funcionales' },
        { name: 'Socket.io', icon: wifi, description: 'Comunicación en tiempo real para chat instantáneo' },
        { name: 'Node.js', icon: logoNodejs, description: 'Backend robusto con Express.js' },
        { name: 'MongoDB', icon: server, description: 'Base de datos NoSQL para almacenamiento' }
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
                        <h2>Chat App - Proyecto Personal</h2>
                        <p className="intro-text">
                            Esta aplicación de chat es un proyecto personal desarrollado para explorar y dominar
                            tecnologías modernas de desarrollo web. Ha sido una experiencia increíble de aprendizaje
                            que me ha permitido profundizar en el desarrollo full-stack.
                        </p>
                    </div>

                    <div className="learning-objectives">
                        <h3>
                            <IonIcon icon={code} />
                            Objetivos de Aprendizaje
                        </h3>
                        <ul>
                            <li>Dominar React.js y el desarrollo de SPAs (Single Page Applications)</li>
                            <li>Implementar comunicación en tiempo real con WebSockets</li>
                            <li>Crear APIs RESTful con Node.js y Express</li>
                            <li>Gestionar estado global de la aplicación</li>
                            <li>Desarrollar interfaces de usuario responsivas y modernas</li>
                            <li>Implementar autenticación y autorización segura</li>
                        </ul>
                    </div>

                    <div className="technologies">
                        <h3>Tecnologías Implementadas</h3>
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
                        <h3>Características Implementadas</h3>
                        <div className="features-list">
                            <div className="feature-item">
                                {/* <span className="feature-bullet">💬</span> */}
                                <IonIcon icon={chatbubbleEllipsesOutline} />
                                <span>Chat en tiempo real con Socket.io</span>
                            </div>
                            <div className="feature-item">
                                {/* <span className="feature-bullet">🔐</span> */}
                                <IonIcon icon={lockClosedOutline} />
                                <span>Sistema de autenticación completo</span>
                            </div>
                            <div className="feature-item">
                                {/* <span className="feature-bullet">📱</span> */}
                                <IonIcon icon={phonePortraitOutline} />
                                <span>Diseño responsive para móviles y desktop</span>
                            </div>
                            <div className="feature-item">
                                {/* <span className="feature-bullet">🌙</span> */}
                                <IonIcon icon={invertModeOutline} />
                                <span>Modo oscuro y claro</span>
                            </div>
                            <div className="feature-item">
                                {/* <span className="feature-bullet">👥</span> */}
                                <IonIcon icon={peopleOutline} />
                                <span>Gestión de contactos y conversaciones</span>
                            </div>
                            <div className="feature-item">
                                {/* <span className="feature-bullet">🎨</span> */}
                                <IonIcon icon={colorPaletteOutline} />
                                <span>Interfaz moderna con animaciones</span>
                            </div>
                        </div>
                    </div>

                    <div className="developer-info">
                        <div className="developer-card">
                            <div className="developer-avatar">
                                <IonIcon icon={logoGithub} />
                            </div>
                            <div className="developer-details">
                                <h3>Desarrollado con <IonIcon icon={heart} className="heart-icon" /></h3>
                                <p>
                                    Este proyecto representa mi pasión por el desarrollo web y mi deseo
                                    constante de aprender nuevas tecnologías y mejores prácticas.
                                </p>
                                <a
                                    href="https://github.com/JuanFDJ73"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="github-link"
                                >
                                    Ver mi GitHub
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="project-footer">
                        <p className="footer-text">
                            ¡Gracias por explorar mi proyecto! Espero que disfrutes usando esta aplicación
                            tanto como yo disfruté desarrollándola.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;