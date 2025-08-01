import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { personAddOutline, closeOutline, searchOutline } from 'ionicons/icons';
import './AddContactModal.css';

const AddContactModal = ({ isOpen, onClose }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        console.log("Presionó buscar usuario: ", searchValue);
    };

    const handleAddContact = () => {
        console.log("Presionó agregar contacto");
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Agregar Contacto</h3>
                    <button className="close-button" onClick={onClose}>
                        <IonIcon icon={closeOutline} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="search-section">
                        <div className="search-input-container">
                            <input
                                type="email"
                                placeholder="Buscar por email..."
                                className="search-input"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button className="search-button" onClick={handleSearch}>
                                <IonIcon icon={searchOutline} />
                            </button>
                        </div>
                    </div>

                    <div className="search-results">
                        <div className="user-result">
                            <div className="user-info">
                                <div className="user-avatar-placeholder">J</div>
                                <div className="user-details">
                                    <div className="user-name">Juan D</div>
                                    <div className="user-email">juan@example.com</div>
                                </div>
                            </div>
                            <button className="add-button" onClick={handleAddContact}>
                                <IonIcon icon={personAddOutline} />
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddContactModal;
