const getConversationMessages = async (conversationId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/${conversationId}`);
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

const deleteMessage = async (messageId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/${messageId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar mensaje');
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting message:', error);
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
    deleteMessage,
    markMessageAsRead,
};
