import React from 'react';
import { IonIcon } from '@ionic/react';
import { trashOutline, closeOutline, personOutline, peopleOutline } from 'ionicons/icons';
import './MessageDeleteModal.css';

// Modal para confirmar eliminación de mensaje
const MessageDeleteModal = ({ 
    isOpen, 
    onClose, 
    onDeleteForMe, 
    onDeleteForAll, 
    isOwnMessage = false,
    isLoading = false,
    contactName = 'el contacto'
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="message-delete-modal">
                <div className="modal-header">
                    <div className="delete-icon">
                        <IonIcon icon={trashOutline} />
                    </div>
                    <h3>Eliminar mensaje</h3>
                    <button className="close-button" onClick={onClose} disabled={isLoading}>
                        <IonIcon icon={closeOutline} />
                    </button>
                </div>

                <div className="modal-body">
                    <p>¿Cómo quieres eliminar este mensaje?</p>
                </div>

                <div className="modal-buttons">
                    <button 
                        className="delete-option-button" 
                        onClick={onDeleteForMe}
                        disabled={isLoading}
                    >
                        <IonIcon icon={personOutline} />
                        <div className="button-content">
                            <span className="button-title">Eliminar para mí</span>
                            <span className="button-subtitle">Solo desaparecerá para ti</span>
                        </div>
                    </button>

                    {isOwnMessage && (
                        <button 
                            className="delete-option-button delete-all" 
                            onClick={onDeleteForAll}
                            disabled={isLoading}
                        >
                            <IonIcon icon={peopleOutline} />
                            <div className="button-content">
                                <span className="button-title">Eliminar para todos</span>
                                <span className="button-subtitle">Desaparecerá para ti y {contactName}</span>
                            </div>
                        </button>
                    )}

                    <button 
                        className="cancel-button" 
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageDeleteModal;