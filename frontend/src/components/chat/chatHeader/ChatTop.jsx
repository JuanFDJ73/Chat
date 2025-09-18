import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import { ellipsisVerticalCircleOutline } from 'ionicons/icons';
import { chevronBackOutline } from 'ionicons/icons';
import ContactAvatar from '@components/ContactAvatar.jsx';
import ChatOptionsMenu from './ChatOptionsMenu.jsx';
import ConfirmationModal from '@components/modal/home/ConfirmationModal.jsx';
import ContactProfileModal from '@components/modal/home/ContactProfileModal.jsx';
import userApi from '@services/api/users.js';
import './ChatTop.css';

const ChatTop = ({ name, image, onBack, contactInfo }) => {
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [fullContactInfo, setFullContactInfo] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);

    const handleOptionsClick = () => {
        setShowOptionsMenu(!showOptionsMenu);
    };

    const handleCloseMenu = () => {
        setShowOptionsMenu(false);
    };

    const handleViewProfile = async () => {
        setLoadingProfile(true);
        try {
            // Obtener información completa del contacto desde la API
            const fullProfile = await userApi.getUserByUid(contactInfo.uid);
            setFullContactInfo({
                ...fullProfile,
                displayName: name, // Usar el nombre que ya tenemos
                photoURL: image,   // Usar la imagen que ya tenemos
                uid: contactInfo.uid
            });
            setShowProfileModal(true);
        } catch (error) {
            console.error('Error al cargar perfil del contacto:', error);
            // Si hay error, mostrar con la información que tenemos
            setFullContactInfo({
                displayName: name,
                photoURL: image,
                uid: contactInfo.uid,
                email: 'No disponible',
                description: 'No disponible'
            });
            setShowProfileModal(true);
        } finally {
            setLoadingProfile(false);
        }
    };

    const handleBlockContact = () => {
        setShowBlockModal(true);
    };

    const handleDeleteContact = () => {
        setShowDeleteModal(true);
    };

    const confirmBlockContact = () => {
        console.log('Bloqueando contacto:', contactInfo);
        // TODO: Implementar lógica de bloqueo
        // alert(`${name} ha sido bloqueado`);
        alert(`Esta opcion aun sigue en desarrollo`);
        setShowBlockModal(false);
    };

    const confirmDeleteContact = () => {
        console.log('Eliminando contacto:', contactInfo);
        // TODO: Implementar lógica de eliminación
        // alert(`${name} ha sido eliminado de tus contactos`);
        alert(`Esta opcion aun sigue en desarrollo`);
        setShowDeleteModal(false);
        onBack(); // Volver a la lista de chats después de eliminar
    };

    return (
        // <--ChatTop component-->
         <div className="chat-top">
            <div className="chat-top-left">
                <button className='back-button-chat' onClick={onBack}>
                    <IonIcon className="icon" icon={chevronBackOutline} />
                </button>
                <button className="avatar-buttton-chat">
                    <ContactAvatar 
                        photoURL={image} 
                        displayName={name} 
                        size="normal" 
                        className="avatar" 
                    />
                    <span>{name}</span>
                </button>
            </div>
            <div className="chat-top-right">
                <button className="options-button-header" onClick={handleOptionsClick}>
                    <IonIcon className="icon" icon={ellipsisVerticalCircleOutline} />
                </button>
                
                <ChatOptionsMenu
                    isOpen={showOptionsMenu}
                    onClose={handleCloseMenu}
                    contactInfo={{ displayName: name, ...contactInfo }}
                    onViewProfile={handleViewProfile}
                    onBlockContact={handleBlockContact}
                    onDeleteContact={handleDeleteContact}
                    isLoadingProfile={loadingProfile}
                />
            </div>

            {/* Modal de perfil del contacto */}
            <ContactProfileModal
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                contactInfo={fullContactInfo}
            />

            {/* Modal de confirmación para bloquear */}
            <ConfirmationModal
                isOpen={showBlockModal}
                onClose={() => setShowBlockModal(false)}
                onConfirm={confirmBlockContact}
                title="Bloquear contacto"
                message={`¿Estás seguro de que quieres bloquear a ${name}? No podrás recibir mensajes de este contacto.`}
                confirmText="Bloquear"
                cancelText="Cancelar"
                type="warning"
            />

            {/* Modal de confirmación para eliminar */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDeleteContact}
                title="Eliminar contacto"
                message={`¿Estás seguro de que quieres eliminar a ${name} de tus contactos? Esta acción no se puede deshacer.`}
                confirmText="Eliminar"
                cancelText="Cancelar"
                type="danger"
            />
        </div>
        // <--End ChatTop component-->
    );
}

export default ChatTop;