import React from 'react';
import MessageSent from '../messages/MessageSent.jsx';
import MessageReceived from '../messages/MessageReceived.JSX';
import './ChatMessages.css';

const ChatMessages = () => {
    return (
        // <--ChatMessages Component-->
        <div className="chat-messages">
            <MessageReceived
                message="Hola, ¿cómo estás?"
                timestamp="10:00 AM"
            />
            <MessageSent
                message="¡Hola! Todo bien, ¿y tú?"
                timestamp="10:01 AM"
            />
            <MessageReceived
                message="Bien bien"
                timestamp="10:02 AM"
            />
            <MessageReceived
                message="jajajaj"
                timestamp="10:03 AM"
            />
            <MessageSent
                message="Epa"
                timestamp="10:04 AM"
            />
        </div>
        // <--End ChatMessages Component-->
    );
}

export default ChatMessages;