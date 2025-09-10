import React, { useState, useRef, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { 
    personOutline, 
    lockClosedOutline, 
    trashOutline,
    eyeOutline
} from 'ionicons/icons';
import './ChatOptionsMenu.css';

const ChatOptionsMenu = ({ isOpen, onClose, contactInfo, onViewProfile, onBlockContact, onDeleteContact }) => {
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

    return (
        <div className="chat-options-menu" ref={menuRef}>
            <div className="chat-options-header">
                <span className="contact-name">{contactInfo?.displayName || 'Contacto'}</span>
            </div>
            
            <div className="chat-options-list">
                <button className="chat-option-item" onClick={handleViewProfile}>
                    <IonIcon icon={eyeOutline} className="option-icon" />
                    <span>Ver perfil</span>
                </button>

                <button className="chat-option-item" onClick={handleBlockContact}>
                    <IonIcon icon={lockClosedOutline} className="option-icon" />
                    <span>Bloquear contacto</span>
                </button>

                <button className="chat-option-item danger" onClick={handleDeleteContact}>
                    <IonIcon icon={trashOutline} className="option-icon" />
                    <span>Eliminar contacto</span>
                </button>
            </div>
        </div>
    );
};

export default ChatOptionsMenu;
