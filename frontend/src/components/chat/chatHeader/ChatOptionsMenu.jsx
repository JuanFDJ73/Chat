import React, { useState, useRef, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { 
    personOutline, 
    lockClosedOutline, 
    trashOutline,
    eyeOutline,
    chatboxOutline
} from 'ionicons/icons';
import './ChatOptionsMenu.css';

const ChatOptionsMenu = ({ isOpen, onClose, contactInfo, onViewProfile, onBlockContact, onDeleteContact, onDeleteMessages, isLoadingProfile }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleViewProfile = () => {
        onViewProfile();
        onClose();
    };

    const handleBlockContact = () => {
        onBlockContact();
        onClose();
    };

    const handleDeleteContact = () => {
        onDeleteContact();
        onClose();
    };

    const handleDeleteMessages = () => {
        onDeleteMessages();
        onClose();
    };

    return (
        <div className="chat-options-menu" ref={menuRef}>
            <div className="chat-options-header">
                <span className="contact-name">{contactInfo?.displayName || 'Contacto'}</span>
            </div>
            
            <div className="chat-options-list">
                <button 
                    className={`chat-option-item ${isLoadingProfile ? 'loading' : ''}`} 
                    onClick={handleViewProfile}
                    disabled={isLoadingProfile}
                >
                    <IonIcon icon={eyeOutline} className="option-icon" />
                    <span>{isLoadingProfile ? 'Cargando...' : 'Ver perfil'}</span>
                </button>

                <button className="chat-option-item" onClick={handleBlockContact}>
                    <IonIcon icon={lockClosedOutline} className="option-icon" />
                    <span>Bloquear contacto</span>
                </button>

                {/* <button className="chat-option-item warning" onClick={handleDeleteMessages}>
                    <IonIcon icon={chatboxOutline} className="option-icon" />
                    <span>Eliminar mensajes</span>
                </button> */}

                <button className="chat-option-item danger" onClick={handleDeleteContact}>
                    <IonIcon icon={trashOutline} className="option-icon" />
                    <span>Eliminar contacto</span>
                </button>
            </div>
        </div>
    );
};

export default ChatOptionsMenu;
