import React from 'react';
import { IonIcon } from '@ionic/react';
import { warningOutline, closeOutline } from 'ionicons/icons';
import './ConfirmationModal.css';

//Modales de confirmación genéricos para acciones como bloquear o eliminar contacto
const ConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = 'Confirmar', 
    cancelText = 'Cancelar',
    type = 'danger' 
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="confirmation-modal">
                <div className="modal-header">
                    <div className={`warning-icon ${type}`}>
                        <IonIcon icon={warningOutline} />
                    </div>
                    <h3>{title}</h3>
                    <button className="close-button" onClick={onClose}>
                        <IonIcon icon={closeOutline} />
                    </button>
                </div>

                <div className="modal-body">
                    <p>{message}</p>
                </div>

                <div className="modal-buttons">
                    <button className="cancel-button" onClick={onClose}>
                        {cancelText}
                    </button>
                    <button className={`confirm-button ${type}`} onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
