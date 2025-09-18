import React, { useState } from 'react';
import socketService from '@services/socket';
import useAuthStore from '@stores/use-auth-store';
import './ChatInput.css';

const ChatInput = ({ activeContact, conversationId }) => {
    const [message, setMessage] = useState('');
    const { userLogged } = useAuthStore();

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (!message.trim() || !activeContact || !userLogged || !conversationId) {
            return;
        }

        const messageData = {
            sender: userLogged.uid,
            receiver: activeContact.uid,
            conversationId: conversationId,
            content: message.trim(),
        };

        console.log('Enviando mensaje:', messageData);

        // Enviar mensaje através de Socket.IO
        socketService.sendMessage(messageData);

        // Limpiar el input
        setMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    return (
        // <--ChatInput Component-->
        <form className="chat-input" onSubmit={handleSendMessage}>
            <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button type="submit" disabled={!message.trim()}>
                Enviar
            </button>
        </form>
        // <--End ChatInput Component-->
    );
};

export default ChatInput;