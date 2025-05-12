import React from 'react';
import './ChatMessages.css';
const ChatMessages = () => {
    return (
        // <--ChatMessages Component-->
        <div class="chat-messages">
            <div class="message received">
                <p>Hola, ¿cómo estás?</p>
                <span class="timestamp">10:00 AM</span>
            </div>
            <div class="message sent">
                <p>¡Hola! Todo bien, ¿y tú?</p>
                <span class="timestamp">10:01 AM</span>
            </div>
        </div>
        // <--End ChatMessages Component-->
    );
}

export default ChatMessages;