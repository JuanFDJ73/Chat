import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

// Configurar S3 Client para Supabase
const s3Client = new S3Client({
    region: import.meta.env.VITE_SUPABASE_S3_REGION,
    endpoint: import.meta.env.VITE_SUPABASE_S3_ENDPOINT,
    credentials: {
        accessKeyId: import.meta.env.VITE_SUPABASE_S3_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_SUPABASE_S3_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true, // Importante para Supabase
});

// Subir imagen usando S3 API v3
const uploadProfileImageS3 = async (userUid, file) => {
    try {
        // Validaciones
        if (!file || !file.type.startsWith('image/')) {
            throw new Error('Solo se permiten archivos de imagen');
        }

        if (file.size > 5 * 1024 * 1024) {
            throw new Error('La imagen no puede superar los 5MB');
        }

        const timestamp = Date.now();
        const fileExtension = file.name.split('.').pop();
        const fileName = `${userUid}/profile_${timestamp}.${fileExtension}`;

        console.log('Subiendo imagen usando S3 API v3...');

        const command = new PutObjectCommand({
            Bucket: 'profile-images',
            Key: fileName,
            Body: file,
            ContentType: file.type,
            ACL: 'public-read'
        });

        const result = await s3Client.send(command);
        console.log('Archivo subido exitosamente:', result);

        // Construir URL pública manualmente
        const publicUrl = `${import.meta.env.VITE_SUPABASE_S3_ENDPOINT}/profile-images/${fileName}`;
        console.log('URL pública:', publicUrl);

        return publicUrl;
    } catch (error) {
        console.error('Error al subir con S3:', error);
        throw error;
    }
};

// Eliminar imagen usando S3 API v3
const deleteProfileImageS3 = async (imageUrl) => {
    try {
        if (!imageUrl || !imageUrl.includes('supabase')) return;

        // Extraer el key del archivo
        const url = new URL(imageUrl);
        const pathParts = url.pathname.split('/');
        const bucketIndex = pathParts.findIndex(part => part === 'profile-images');
        const key = pathParts.slice(bucketIndex + 1).join('/');

        console.log('Eliminando archivo S3:', key);

        const command = new DeleteObjectCommand({
            Bucket: 'profile-images',
            Key: key
        });

        await s3Client.send(command);
        console.log('Imagen eliminada exitosamente');
    } catch (error) {
        console.error('Error al eliminar con S3:', error);
        throw error;
    }
};

export {
    uploadProfileImageS3 as uploadProfileImage,
    deleteProfileImageS3 as deleteProfileImage
};