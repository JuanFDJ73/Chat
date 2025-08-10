import React from 'react';
import { IonIcon } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import useAuthStore from '../stores/use-auth-store';
import './UserAvatar.css';

const UserAvatar = ({ className = '', size = 'normal', onClick = null }) => {
    const { userLogged, userProfile } = useAuthStore();
    
    // Función para obtener la imagen correcta con prioridad
    const getUserAvatar = () => {
        // Prioridad: BD > Firebase > null
        return userProfile?.photoURL || userLogged?.photoURL || null;
    };

    const avatarUrl = getUserAvatar();

    const sizeClasses = {
        small: 'w-8 h-8',
        normal: 'w-12 h-12', 
        large: 'w-16 h-16'
    };

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
