import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowBackCircle, personCircleOutline, createOutline, mailOutline, calendarOutline, chatboxEllipsesOutline, eyeOutline, cameraOutline, trashOutline } from 'ionicons/icons';
import useAuthStore from '@stores/use-auth-store';
import userApi from '@services/api/users';
import { useLanguage } from '@contexts/LanguageContext.jsx';
import './Profile.css';
import ViewImageModal from '@components/modal/ViewImageModal.jsx';

const Profile = () => {
    const navigate = useNavigate();
    const { t, currentLanguage } = useLanguage();
    const { userLogged, userProfile, loadUserProfile, updateUserProfile } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [description, setDescription] = useState('');
    const [currentPhotoURL, setCurrentPhotoURL] = useState('');
    const [showImageModal, setShowImageModal] = useState(false);
    const [showAvatarOptions, setShowAvatarOptions] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const avatarOptionsRef = useRef(null);

    useEffect(() => {
        const loadData = async () => {
            if (!userLogged?.uid) return;

            // Si ya tenemos el perfil en el store, usarlo
            if (userProfile) {
                setDisplayName(userProfile.displayName || userLogged.displayName || '');
                setDescription(userProfile.description || '');
                setCurrentPhotoURL(userProfile.photoURL || ''); // No usar Firebase como fallback
            } else {
                // Si no, cargar desde la BD
                await loadUserProfile(userLogged.uid);
            }
        };

        loadData();
    }, [userLogged, userProfile, loadUserProfile]);

    // Actualizar estados cuando cambie el perfil del store
    useEffect(() => {
        if (userProfile) {
            setDisplayName(userProfile.displayName || userLogged?.displayName || '');
            setDescription(userProfile.description || '');
            setCurrentPhotoURL(userProfile.photoURL || ''); // No usar Firebase como fallback
        }
    }, [userProfile, userLogged]);

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (avatarOptionsRef.current && !avatarOptionsRef.current.contains(event.target)) {
                setShowAvatarOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleEdit = async () => {
        if (isEditing) {
            try {
                const nameInput = document.querySelector('.info-input[data-field="name"]');
                const descriptionInput = document.querySelector('.info-input[data-field="description"]');

                const newDisplayName = nameInput.value;
                const newDescription = descriptionInput.value;

                await Promise.all([
                    userApi.updateDisplayName(userLogged.uid, newDisplayName),
                    userApi.updateDescription(userLogged.uid, newDescription)
                ]);

                setDisplayName(newDisplayName);
                setDescription(newDescription);

                // Actualizar store
                updateUserProfile({
                    displayName: newDisplayName,
                    description: newDescription
                });

                console.log('Perfil actualizado');
            } catch (error) {
                console.error('Error al actualizar perfil:', error);
            }
        }
        setIsEditing(!isEditing);
    };

    const handleAvatarClick = () => {
        if (!isUploading) {
            setShowAvatarOptions(!showAvatarOptions);
        }
    };

    const handleViewImage = () => {
        if (currentPhotoURL) {
            setShowImageModal(true);
        }
        setShowAvatarOptions(false);
    };

    const handleEditImage = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                setIsUploading(true);
                setUploadError('');
                setShowAvatarOptions(false);

                try {
                    console.log('Iniciando subida de imagen...');
                    const result = await userApi.uploadProfileImage(userLogged.uid, file);
                    
                    const newPhotoURL = result.user.photoURL;
                    
                    // Actualizar estado local
                    setCurrentPhotoURL(newPhotoURL);
                    
                    // Actualizar store
                    updateUserProfile({ photoURL: newPhotoURL });
                    
                    console.log('Imagen subida exitosamente');
                    
                } catch (error) {
                    console.error('Error al subir imagen:', error);
                    setUploadError(error.message || 'Error al subir la imagen');
                } finally {
                    setIsUploading(false);
                }
            }
        };
        
        input.click();
    };

    const handleDeleteImage = async () => {
        if (!currentPhotoURL) return;

        setIsUploading(true);
        setUploadError('');
        setShowAvatarOptions(false);

        try {
            await userApi.deleteProfileImage(userLogged.uid);
            
            setCurrentPhotoURL(''); // Dejar vacío para mostrar icono por defecto
            
            // Actualizar store
            updateUserProfile({ photoURL: null });
            
            console.log('Imagen eliminada exitosamente');
            
        } catch (error) {
            console.error('Error al eliminar imagen:', error);
            setUploadError(error.message || 'Error al eliminar la imagen');
        } finally {
            setIsUploading(false);
        }
    };

    // Formatear fecha de creación
    const formatDate = (dateString) => {
        if (!dateString) return t('notAvailable');
        
        const localeMap = {
            'es': 'es-ES',
            'en': 'en-US',
            'fr': 'fr-FR',
            'pt': 'pt-BR'
        };
        
        return new Date(dateString).toLocaleDateString(localeMap[currentLanguage] || 'es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="profile">
            <div className="profile-container">
                <div className="profile-header">
                    <button onClick={() => navigate('/')} className="back-button">
                        <IonIcon className="back-icon" icon={arrowBackCircle} />
                    </button>
                    <h1 className="profile-title">{t('myProfile')}</h1>
                </div>

                <div className="profile-content">
                    <div className="profile-avatar-section">
                        <div className="profile-avatar-container" ref={avatarOptionsRef}>
                            <div className={`avatar-wrapper ${isUploading ? 'uploading' : ''}`} onClick={handleAvatarClick}>
                                {currentPhotoURL ? (
                                    <img
                                        src={currentPhotoURL}
                                        alt={t('userAvatar')}
                                        className="profile-avatar"
                                    />
                                ) : (
                                    <IonIcon className="profile-avatar-placeholder" icon={personCircleOutline} />
                                )}
                                <div className="avatar-overlay">
                                    {isUploading ? (
                                        <div className="upload-spinner"></div>
                                    ) : (
                                        <IonIcon icon={cameraOutline} />
                                    )}
                                </div>
                            </div>
                            
                            {showAvatarOptions && !isUploading && (
                                <div className="avatar-options-dropdown">
                                    {currentPhotoURL && (
                                        <button className="avatar-option" onClick={handleViewImage}>
                                            <IonIcon icon={eyeOutline} />
                                            {t('viewImage')}
                                        </button>
                                    )}
                                    <button className="avatar-option" onClick={handleEditImage}>
                                        <IonIcon icon={cameraOutline} />
                                        {currentPhotoURL ? t('changeImage') : t('addImage')}
                                    </button>
                                    {currentPhotoURL && (
                                        <button className="avatar-option delete" onClick={handleDeleteImage}>
                                            <IonIcon icon={trashOutline} />
                                            {t('deleteImage')}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Mostrar estado de carga y errores */}
                        {isUploading && (
                            <p className="upload-status">{t('changingImage')}</p>
                        )}
                        {uploadError && (
                            <p className="upload-error">{uploadError}</p>
                        )}
                        
                        <button className="edit-button" onClick={handleEdit}>
                            <IonIcon icon={createOutline} />
                            {isEditing ? t('save') : t('edit')}
                        </button>
                    </div>

                    <div className="profile-info">
                        <div className="info-item">
                            <div className="info-icon">
                                <IonIcon icon={personCircleOutline} />
                            </div>
                            <div className="info-content">
                                <label className="info-label">{t('name')}</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        defaultValue={displayName}
                                        className="info-input"
                                        data-field="name"
                                    />
                                ) : (
                                    <span className="info-value">{displayName}</span>
                                )}
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <IonIcon icon={chatboxEllipsesOutline} />
                            </div>
                            <div className="info-content">
                                <label className="info-label">{t('description')}</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        defaultValue={description}
                                        className="info-input"
                                        data-field="description"
                                    />
                                ) : (
                                    <span className="info-value">{description || t('noDescription')}</span>
                                )}
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <IonIcon icon={mailOutline} />
                            </div>
                            <div className="info-content">
                                <label className="info-label">{t('email')}</label>
                                <span className="info-value">{userLogged.email}</span>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <IonIcon icon={calendarOutline} />
                            </div>
                            <div className="info-content">
                                <label className="info-label">{t('memberSince')}</label>
                                <span className="info-value">
                                    {formatDate(userLogged.metadata?.creationTime)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para ver imagen */}
            <ViewImageModal
            <ViewImageModal
                open={showImageModal} 
                onClose={() => setShowImageModal(false)} 
                imageUrl={currentPhotoURL} 
            />
        </div>
    );
};

export default Profile;