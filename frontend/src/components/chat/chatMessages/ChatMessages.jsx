import React from 'react';
import './ChatMessages.css';

const ChatMessages = () => {
    return (
        // <--ChatMessages Component-->
        <div className="chat-messages">
            <div className="message received">
                <p>Hola, ¿cómo estás?</p>
                <span className="timestamp">10:00 AM</span>
            </div>
            <div className="message sent">
                <p>¡Hola! Todo bien, ¿y tú?</p>
                <span className="timestamp">10:01 AM</span>
            </div>
        </div>
        // <--End ChatMessages Component-->
    );
}

export default ChatMessages;