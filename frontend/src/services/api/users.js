import { uploadProfileImage as uploadToSupabase, deleteProfileImage as deleteFromSupabase } from '../supabase/supabaseStorage.js';

//Variables de entorno
const API_URL = import.meta.env.VITE_API_URL;

// Conseguir usuario por UID
const getUserByUid = async (uid) => {
    const response = await fetch(`${API_URL}/api/users/${uid}`);
    if (!response.ok) {
        throw new Error('Error al obtener el usuario');
    }
    return await response.json();
};

// Conseguir usuario por email
const getUserByEmail = async (email) => {
    const response = await fetch(`${API_URL}/api/users/email/${email}`);
    if (!response.ok) {
        throw new Error('Error al obtener el usuario');
    }
    return await response.json();
};

// Conseguir usuario por nombre de usuario (displayName)
const getUserByDisplayName = async (displayName) => {
    const response = await fetch(`${API_URL}/api/users/displayname/${displayName}`);
    if (!response.ok) {
        throw new Error('Error al obtener el usuario');
    }
    return await response.json();
};

// Buscar usuario por email o displayName
const searchUser = async (searchTerm) => {
    const response = await fetch(`${API_URL}/api/users/search/${searchTerm}`);
    if (!response.ok) {
        throw new Error('Error al buscar el usuario');
    }
    return await response.json();
};

// Actualizar apodo de contacto
const updateContactNickname = async (userUid, contactUid, nickname) => {
    const response = await fetch(`${API_URL}/api/users/${userUid}/contacts/${contactUid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname })
    });
    
    if (!response.ok) {
        throw new Error('Error al actualizar nickname');
    }
    return await response.json();
};

// Conseguir display name
const getDisplayName = async (userUid) => {
    const response = await fetch(`${API_URL}/api/users/${userUid}/display-name`);
    if (!response.ok) {
        throw new Error('Error al obtener display name');
    }
    return await response.json();
};

// Actualizar display name
const updateDisplayName = async (userUid, displayName) => {
    const response = await fetch(`${API_URL}/api/users/${userUid}/display-name`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ displayName })
    });

    if (!response.ok) {
        throw new Error('Error al actualizar display name');
    }
    return await response.json();
};

// Conseguir descripción
const getDescription = async (userUid) => {
    const response = await fetch(`${API_URL}/api/users/${userUid}/description`);
    if (!response.ok) {
        throw new Error('Error al obtener descripción');
    }
    return await response.json();
};

// Actualizar descripción
const updateDescription = async (userUid, description) => {
    const response = await fetch(`${API_URL}/api/users/${userUid}/description`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description })
    });

    if (!response.ok) {
        throw new Error('Error al actualizar descripción');
    }
    return await response.json();
};

// Eliminar descripción
const deleteDescription = async (userUid) => {
    const response = await fetch(`${API_URL}/api/users/${userUid}/description`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Error al eliminar descripción');
    }
    return await response.json();
};

// Conseguir imagen de perfil
const getProfileImage = async (userUid) => {
    const response = await fetch(`${API_URL}/api/users/${userUid}/photo-url`);
    if (!response.ok) {
        throw new Error('Error al obtener imagen de perfil');
    }
    return await response.json();
};

// Subir imagen de perfil usando Supabase
const uploadProfileImage = async (userUid, file) => {
    try {
        console.log('Iniciando proceso de subida con Supabase...');

        // Obtener la imagen actual para eliminarla después
        let currentImageUrl = null;
        try {
            const currentImage = await getProfileImage(userUid);
            currentImageUrl = currentImage.photoURL;
            console.log('Imagen actual:', currentImageUrl);
        } catch (error) {
            console.log('No hay imagen actual o error al obtenerla');
        }

        // Subir nueva imagen usando Supabase
        console.log('Subiendo nueva imagen con Supabase...');
        const downloadURL = await uploadToSupabase(userUid, file);
        console.log('Nueva imagen subida:', downloadURL);

        // Actualizar URL en la base de datos
        console.log('Actualizando URL en base de datos...');
        const response = await fetch(`${API_URL}/api/users/${userUid}/photo-url`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ photoURL: downloadURL })
        });

        if (!response.ok) {
            // Si falla la actualización en BD, eliminar la imagen de Supabase
            console.log('Error al actualizar BD, eliminando imagen de Supabase...');
            await deleteFromSupabase(downloadURL);
            throw new Error('Error al actualizar la imagen en la base de datos');
        }

        const result = await response.json();
        console.log('BD actualizada exitosamente');

        // Eliminar imagen anterior (si existía)
        if (currentImageUrl && currentImageUrl.includes('supabase')) {
            try {
                console.log('Eliminando imagen anterior...');
                await deleteFromSupabase(currentImageUrl);
                console.log('Imagen anterior eliminada');
            } catch (error) {
                console.warn('No se pudo eliminar la imagen anterior:', error);
            }
        }

        return result;
    } catch (error) {
        console.error('Error en uploadProfileImage:', error);
        throw error;
    }
};

// Eliminar imagen de perfil
const deleteProfileImage = async (userUid) => {
    try {
        console.log('Iniciando eliminación de imagen...');

        // Obtener URL actual
        const currentImage = await getProfileImage(userUid);
        const currentImageUrl = currentImage.photoURL;
        console.log('Imagen a eliminar:', currentImageUrl);

        // Eliminar de la base de datos
        console.log('Eliminando de base de datos...');
        const response = await fetch(`${API_URL}/api/users/${userUid}/photo-url`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar imagen de perfil de la base de datos');
        }

        const result = await response.json();
        console.log('Eliminado de BD exitosamente');

        // Eliminar de Supabase
        if (currentImageUrl && currentImageUrl.includes('supabase')) {
            console.log('Eliminando de Supabase...');
            await deleteFromSupabase(currentImageUrl);
            console.log('Eliminado de Supabase exitosamente');
        }

        return result;
    } catch (error) {
        console.error('Error en deleteProfileImage:', error);
        throw error;
    }
};

export default {
    getUserByUid,
    getUserByEmail,
    getUserByDisplayName,
    searchUser,
    updateContactNickname,
    getDisplayName,
    updateDisplayName,
    getDescription,
    updateDescription,
    deleteDescription,
    getProfileImage,
    uploadProfileImage,
    deleteProfileImage
};