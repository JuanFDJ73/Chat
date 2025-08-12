import React from 'react';
import { IonIcon } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import useAuthStore from '../stores/use-auth-store';
import './UserAvatar.css';

const UserAvatar = ({ className = '', size = 'normal', onClick = null }) => {
    const { userLogged, userProfile } = useAuthStore();
    
    const getUserAvatar = () => {
        // Solo usar la imagen de la BD
        return userProfile?.photoURL || null;
    };

    const avatarUrl = getUserAvatar();

    if (avatarUrl) {
        return (
            <img
                src={avatarUrl}
                alt="Avatar del usuario"
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

export default UserAvatar;
