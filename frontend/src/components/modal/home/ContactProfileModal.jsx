import React from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline,personCircleOutline, mailOutline, chatboxEllipsesOutline } from 'ionicons/icons';
import './ContactProfileModal.css';

// Modal para mostrar el perfil completo de un contacto
const ContactProfileModal = ({ isOpen, onClose, contactInfo }) => {
    if (!isOpen || !contactInfo) return null;

    return (
        <div className="modal-overlay">
            <div className="contact-profile-modal">
                <div className="modal-header">
                    <h3>Perfil del contacto</h3>
                    <button className="close-button" onClick={onClose}>
                        <IonIcon icon={closeOutline} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="contact-avatar-section">
                        <div className="contact-avatar-container">
                            {contactInfo.photoURL ? (
                                <img
                                    src={contactInfo.photoURL}
                                    alt={`Avatar de ${contactInfo.displayName}`}
                                    className="contact-avatar"
                                />
                            ) : (
                                <IonIcon className="contact-avatar-placeholder" icon={personCircleOutline} />
                            )}
                        </div>
                        <h4 className="contact-name">{contactInfo.displayName}</h4>
                    </div>

                    <div className="contact-info">
                        <div className="info-item">
                            <div className="info-icon">
                                <IonIcon icon={personCircleOutline} />
                            </div>
                            <div className="info-content">
                                <label className="info-label">Nombre de usuario</label>
                                <span className="info-value">{contactInfo.displayName}</span>
                            </div>
                        </div>

                        {contactInfo.email && (
                            <div className="info-item">
                                <div className="info-icon">
                                    <IonIcon icon={mailOutline} />
                                </div>
                                <div className="info-content">
                                    <label className="info-label">Email</label>
                                    <span className="info-value">{contactInfo.email}</span>
                                </div>
                            </div>
                        )}

                        {contactInfo.description && (
                            <div className="info-item">
                                <div className="info-icon">
                                    <IonIcon icon={chatboxEllipsesOutline} />
                                </div>
                                <div className="info-content">
                                    <label className="info-label">Descripción</label>
                                    <span className="info-value">{contactInfo.description}</span>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* <div className="modal-footer">
                    <div className="contact-stats">
                        <div className="stat-item">
                            <span className="stat-label">UID</span>
                            <span className="stat-value">{contactInfo.uid?.slice(-8) || 'No disponible'}</span>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default ContactProfileModal;