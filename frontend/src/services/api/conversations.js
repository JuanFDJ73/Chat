const getUserConversations = async (userLogged) => {
    const response = await fetch(`http://localhost:5000/api/users/${userLogged.uid}/conversations-with-names`);
    if (!response.ok) {
        throw new Error('Error al obtener conversaciones');
    }
    return await response.json();
}

export default {
    getUserConversations,
};