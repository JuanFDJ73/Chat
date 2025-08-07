// crear la conversación si no existe
const createConversation = async (participants) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/conversations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participants }),
    });
    if (!response.ok) {
        throw new Error('Error al crear conversación');
    }
    return await response.json();
};

const getUserConversations = async (userLogged) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userLogged.uid}/conversations-with-names`);
    if (!response.ok) {
        throw new Error('Error al obtener conversaciones');
    }
    return await response.json();
}

export default {
    createConversation,
    getUserConversations,
};