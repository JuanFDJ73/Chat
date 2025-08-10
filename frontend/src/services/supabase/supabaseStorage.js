import { supabase } from './supabase.js';



// Subir imagen de perfil
const uploadProfileImage = async (userUid, file) => {
    try {
        // Validar archivo
        if (!file || !file.type.startsWith('image/')) {
            throw new Error('Solo se permiten archivos de imagen');
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            throw new Error('La imagen no puede superar los 5MB');
        }

        // Crear nombre único para el archivo (opcionalmente por carpeta del usuario)
        const timestamp = Date.now();
        const fileExtension = file.name.split('.').pop();
        const fileName = `${userUid}/profile_${timestamp}.${fileExtension}`;

        console.log('Subiendo imagen a Supabase Storage...');

        // Subir archivo con metadata del propietario
        const { data, error } = await supabase.storage
            .from('profile-images')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
                metadata: { owner: userUid } // Guardar el dueño
            });

        if (error) {
            console.error('Error de Supabase:', error);
            throw new Error(`Error al subir imagen: ${error.message}`);
        }

        console.log('Archivo subido exitosamente:', data);

        // Obtener URL pública
        const { data: { publicUrl } } = supabase.storage
            .from('profile-images')
            .getPublicUrl(fileName);

        console.log('URL pública obtenida:', publicUrl);

        return publicUrl;
    } catch (error) {
        console.error('Error al subir imagen:', error);
        throw error;
    }
};

// Eliminar imagen de perfil
const deleteProfileImage = async (imageUrl) => {
    try {
        if (!imageUrl || !imageUrl.includes('supabase')) return;

        // Extraer el nombre del archivo de la URL
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const bucketBaseUrl = `${supabaseUrl}/storage/v1/object/public/profile-images/`;
        
        // Extraer el path del archivo
        const filePath = imageUrl.replace(bucketBaseUrl, '');

        console.log('URL completa:', imageUrl);
        console.log('Base URL:', bucketBaseUrl);
        console.log('Eliminando archivo:', filePath);

        // Eliminar archivo de Supabase Storage
        const { error } = await supabase.storage
            .from('profile-images')
            .remove([filePath]);

        if (error) {
            console.error('Error al eliminar de Supabase:', error);
            throw new Error(`Error al eliminar imagen: ${error.message}`);
        }

        console.log('Imagen eliminada exitosamente de Supabase Storage');
    } catch (error) {
        console.error('Error al eliminar imagen:', error);
        throw error;
    }
};

export {
    uploadProfileImage,
    deleteProfileImage
};