import React from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline, personOutline } from 'ionicons/icons';
import './AdminInfoModal.css';

const AdminInfoModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="admin-modal-overlay">
            <div className="admin-modal-content">
                <div className="admin-modal-header">
                    <h3>Información del Administrador</h3>
                    <button className="admin-close-button" onClick={onClose}>
                        <IonIcon icon={closeOutline} />
                    </button>
                </div>
                
                <div className="admin-modal-body">
                    <div className="admin-info">
                        {/* <div className="admin-avatar">
                            <IonIcon icon={personOutline} />
                        </div> */}
                        <div className="admin-details">
                            <h4>Juan Fernando Duque</h4>
                            <p>Administrador de la aplicación</p>
                            <p className="admin-note">
                                Para agregar al administrador como contacto, 
                                busca por el nombre "Juan Fernando Duque".
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="admin-modal-footer">
                    <button className="admin-ok-button" onClick={onClose}>
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminInfoModal;