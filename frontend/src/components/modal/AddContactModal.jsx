import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { personAddOutline, closeOutline, searchOutline } from 'ionicons/icons';
import userApi from '../../services/api/users.js';
import conversationsApi from '../../services/api/conversations.js';
import SearchResults from './SearchResults.jsx';
import MistakeModal from './MistakeModal.jsx';
import useAuthStore from '../../stores/use-auth-store.js';
import useConversationsStore from '../../stores/use-conversations-store.js';
import './AddContactModal.css';

const AddContactModal = ({ isOpen, onClose }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { userLogged } = useAuthStore();
    const { invalidateCache } = useConversationsStore();

    const handleSearch = async () => {
        try {
            const user = await userApi.getUserByEmail(searchValue);
            setSearchResults([user]);
        } catch (error) {
            setErrorMessage("Usuario " + searchValue + " no encontrado");
            setShowErrorModal(true);
        }
        console.log("Presionó buscar usuario: ", searchValue);
    };

    const handleAddContact = async () => {
        try {
            const user = searchResults[0];
            if (user && userLogged) {
                // Crear conversación con los UIDs correctos
                const participants = [userLogged.uid, user.uid]; // USAR uid, NO id
                const conversation = await conversationsApi.createConversation(participants);
                
                console.log('Conversación creada:', conversation);
                
                // Invalidar cache para forzar recarga de conversaciones
                invalidateCache();
                
                // Cerrar modal y limpiar datos
                handleClose()
            }
        } catch (error) {
            console.error('Error al agregar contacto:', error);
            setErrorMessage("Error al agregar contacto");
            setShowErrorModal(true); 
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setErrorMessage('');
    };

    // Función para limpiar todos los datos
    const resetModalData = () => {
        setSearchValue('');
        setSearchResults([]);
        setShowErrorModal(false);
        setErrorMessage('');
    };

    // Función para cerrar el modal y limpiar datos
    const handleClose = () => {
        resetModalData();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Agregar Contacto</h3>
                        <button className="close-button" onClick={handleClose}>
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
                        <SearchResults
                            searchResults={searchResults}
                            handleAddContact={handleAddContact}
                        />
                    </div>
                </div>
            </div>

            {/* Renderizar condicionalmente el modal de error */}
            {showErrorModal && (
                <MistakeModal
                    title="Error"
                    text={errorMessage}
                    onAccept={handleCloseErrorModal}
                    onClose={handleCloseErrorModal}
                />
            )}
        </>
    );
};

export default AddContactModal;
