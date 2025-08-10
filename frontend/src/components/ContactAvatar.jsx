import React from 'react';
import { IonIcon } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import './UserAvatar.css';

const ContactAvatar = ({ photoURL, displayName, size = 'normal', className = '', onClick }) => {
    if (photoURL) {
        return (
            <img
                src={photoURL}
                alt={`Avatar de ${displayName}`}
                className={`user-avatar ${size} ${className}`}
                onClick={onClick}
                style={{ cursor: onClick ? 'pointer' : 'default' }}
            />
        );
    }

    return (
        <IonIcon 
            icon={personCircleOutline} 
            className={`user-avatar-icon ${size} ${className}`}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        />
    );
};

export default ContactAvatar;
