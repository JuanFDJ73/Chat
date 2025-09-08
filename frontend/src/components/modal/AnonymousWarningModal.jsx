import React from 'react';
import { IonIcon } from '@ionic/react';
import { warningOutline, closeOutline, personOutline } from 'ionicons/icons';
import './AnonymousWarningModal.css';

const AnonymousWarningModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="anonymous-warning-modal">
                <div className="modal-header">
                    <div className="warning-icon">
                        <IonIcon icon={warningOutline} />
                    </div>
                    <h3>Acceso Anónimo</h3>
                    <button className="close-button" onClick={onClose}>
                        <IonIcon icon={closeOutline} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="warning-content">
                        <div className="user-icon">
                            <IonIcon icon={personOutline} />
                        </div>
                        
                        <h4>⚠️ Advertencia Importante</h4>
                        
                        <div className="warning-points">
                            <div className="warning-point">
                                <span className="point-icon">🔒</span>
                                <p>
                                    <strong>Pérdida de acceso:</strong> El usuario anónimo perderá acceso a la cuenta en el momento en que se desloguee.
                                </p>
                            </div>
                            
                            <div className="warning-point">
                                <span className="point-icon">⏰</span>
                                <p>
                                    <strong>Eliminación automática:</strong> La cuenta se borrará automáticamente si hay más de 7 días de inactividad.
                                </p>
                            </div>
                            
                            <div className="warning-point">
                                <span className="point-icon">💾</span>
                                <p>
                                    <strong>Sin recuperación:</strong> No será posible recuperar conversaciones, contactos o datos una vez que se pierda el acceso.
                                </p>
                            </div>
                        </div>

                        <div className="recommendation">
                            <p>
                                <strong>Recomendación:</strong> Para una experiencia completa y segura, considera crear una cuenta con Google o email.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="modal-buttons">
                    <button className="cancel-button" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="confirm-button" onClick={onConfirm}>
                        Entiendo, continuar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnonymousWarningModal;
