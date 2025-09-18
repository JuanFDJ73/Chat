const getConversationMessages = async (conversationId, uid = null) => {
    try {
        let url = `${import.meta.env.VITE_API_URL}/api/messages/${conversationId}`;
        if (uid) {
            url += `?uid=${uid}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener mensajes');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

const sendMessage = async (messageData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
        });
        
        if (!response.ok) {
            throw new Error('Error al enviar mensaje');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

// Eliminar mensaje para un usuario específico
const deleteMessageForUser = async (messageId, uid) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/${messageId}/delete-for-user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid }),
        });

        if (!response.ok) {
            throw new Error('Error al eliminar mensaje para usuario');
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting message for user:', error);
        throw error;
    }
};

// Eliminar mensaje para todos los participantes
const deleteMessageForAll = async (messageId, uid) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/${messageId}/delete-for-all`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid }),
        });

        if (!response.ok) {
            throw new Error('Error al eliminar mensaje para todos');
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting message for all:', error);
        throw error;
    }
};

const markMessageAsRead = async (messageId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/read/${messageId}`, {
            method: 'POST',
        });
        
        if (!response.ok) {
            throw new Error('Error al marcar mensaje como leído');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error marking message as read:', error);
        throw error;
    }
};

export default {
    getConversationMessages,
    sendMessage,
    deleteMessageForUser,
    deleteMessageForAll,
    markMessageAsRead,
};
