import React from 'react';
import './ChatInput.css';

const ChatInput = () => {
    return (
        // <--ChatInput Component-->
        < div className="chat-input" >
            <input type="text" placeholder="Escribe un mensaje..." />
            <button>Enviar</button>
        </div >
        // <--End ChatInput Component-->
    );
}

export default ChatInput;