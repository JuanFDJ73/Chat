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
import messagesApi from '@services/api/messages.js';
import useAuthStore from '@stores/use-auth-store.js';
import useConversationsStore from '@stores/use-conversations-store.js';
import './ChatTop.css';

const ChatTop = ({ name, image, onBack, contactInfo }) => {
    const { userLogged } = useAuthStore();
    const { loadConversations } = useConversationsStore();
    
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteMessagesModal, setShowDeleteMessagesModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [fullContactInfo, setFullContactInfo] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [deletingContact, setDeletingContact] = useState(false);
    const [deletingMessages, setDeletingMessages] = useState(false);

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

    const handleDeleteMessages = () => {
        setShowDeleteMessagesModal(true);
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

    const confirmDeleteMessages = async () => {
        setDeletingMessages(true);
        try {
            // 1. Obtener todos los mensajes de la conversación
            const messages = await messagesApi.getConversationMessages(contactInfo.conversationId);
            
            // 2. Eliminar cada mensaje para el usuario actual
            if (messages.length > 0) {
                const deletePromises = messages.map(message => 
                    messagesApi.deleteMessageForUser(message._id, userLogged.uid)
                );
                
                // Ejecutar todas las eliminaciones de mensajes en paralelo
                await Promise.all(deletePromises);
                console.log(`${messages.length} mensajes eliminados para el usuario`);
            }
            
            // 3. Recargar conversaciones para reflejar los cambios
            await loadConversations(userLogged, true);
            
            console.log(`Todos los mensajes de ${name} han sido eliminados`);
            setShowDeleteMessagesModal(false);
            onBack(); // Volver a la lista de chats después de eliminar
        } catch (error) {
            console.error('Error al eliminar mensajes:', error);
            alert('Error al eliminar los mensajes. Intenta de nuevo.');
        } finally {
            setDeletingMessages(false);
        }
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
                    onDeleteMessages={handleDeleteMessages}
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

            {/* Modal de confirmación para eliminar mensajes */}
            <ConfirmationModal
                isOpen={showDeleteMessagesModal}
                onClose={() => setShowDeleteMessagesModal(false)}
                onConfirm={confirmDeleteMessages}
                title="Eliminar mensajes"
                message={`¿Estás seguro de que quieres eliminar todos los mensajes de ${name}? Esta acción no se puede deshacer.`}
                confirmText="Eliminar mensajes"
                cancelText="Cancelar"
                type="warning"
                loading={deletingMessages}
            />
        </div>
        // <--End ChatTop component-->
    );
}

export default ChatTop;