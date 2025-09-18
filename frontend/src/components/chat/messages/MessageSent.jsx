import React, { useState, useRef, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { ellipsisVerticalOutline, eyeOutline, trashOutline, copyOutline } from 'ionicons/icons';
import MessageDeleteModal from '@components/modal/home/MessageDeleteModal.jsx';
import messagesApi from '@services/api/messages.js';
import useAuthStore from '@stores/use-auth-store.js';
import './MessageSent.css';

const MessageSent = ({ message, contactName, onMessageDeleted }) => {
    const [showMessagesOptions, setShowMessagesOptions] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const optionsRef = useRef(null);
    const buttonRef = useRef(null);

    const { userLogged } = useAuthStore();

    // Cerrar menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target) && 
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setShowMessagesOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionsClick = () => {
        console.log("Options clicked, ID:", message._id);
        setShowMessagesOptions(!showMessagesOptions);
    }

    const handleCopyMessage = () => {
        console.log("Copy message clicked, ID:", message._id);
        navigator.clipboard.writeText(message.content);
        setShowMessagesOptions(false);
    }

    const handleViewInfo = () => {
        console.log("View info clicked");
        setShowMessagesOptions(false);
    }

    const handleDeleteMessage = () => {
        console.log("Delete message clicked, ID:", message._id);
        setShowMessagesOptions(false);
        setShowDeleteModal(true);
    }

    const handleDeleteForMe = async () => {
        setIsDeleting(true);
        try {
            await messagesApi.deleteMessageForUser(message._id, userLogged.uid);
            setShowDeleteModal(false);
            if (onMessageDeleted) {
                onMessageDeleted(message._id);
            }
        } catch (error) {
            console.error('Error al eliminar mensaje para mí:', error);
            alert('Error al eliminar el mensaje. Intenta de nuevo.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDeleteForAll = async () => {
        setIsDeleting(true);
        try {
            await messagesApi.deleteMessageForAll(message._id, userLogged.uid);
            setShowDeleteModal(false);
            if (onMessageDeleted) {
                onMessageDeleted(message._id);
            }
        } catch (error) {
            console.error('Error al eliminar mensaje para todos:', error);
            alert('Error al eliminar el mensaje. Intenta de nuevo.');
        } finally {
            setIsDeleting(false);
        }
    };

    // Formatear el timestamp
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <div className="sent">
            <div className="options-container" ref={optionsRef}>
                <button 
                    className='options-button' 
                    onClick={handleOptionsClick}
                    ref={buttonRef}
                >
                    <IonIcon className="icon" icon={ellipsisVerticalOutline} />
                </button>
                
                {showMessagesOptions && (
                    <div className="messages-options-dropdown">
                        <button className="messages-option" onClick={handleViewInfo}>
                            <IonIcon icon={eyeOutline} />
                            Info
                        </button>
                        <button className="messages-option" onClick={handleCopyMessage}>
                            <IonIcon icon={copyOutline} />
                            Copiar mensaje
                        </button>
                        <button className="messages-option delete" onClick={handleDeleteMessage}>
                            <IonIcon icon={trashOutline} />
                            Eliminar mensaje
                        </button>
                    </div>
                )}
            </div>
            
            <div className="message-sent">
                <p>{message.content}</p>
                <span className="timestamp">{formatTime(message.timestamp)}</span>
            </div>

            {/* Modal de opciones de eliminación */}
            <MessageDeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDeleteForMe={handleDeleteForMe}
                onDeleteForAll={handleDeleteForAll}
                isOwnMessage={true}
                isLoading={isDeleting}
                contactName={contactName || 'el contacto'}
            />
        </div>
    );
};

export default MessageSent;
