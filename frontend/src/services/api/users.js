const updateContactNickname = async (userUid, contactUid, nickname) => {
    const response = await fetch(`http://localhost:5000/api/users/${userUid}/contacts/${contactUid}`, {
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
}

export default {
    updateContactNickname
};