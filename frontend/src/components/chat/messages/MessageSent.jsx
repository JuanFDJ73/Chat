import React, { useState, useRef, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { ellipsisVerticalOutline, eyeOutline, trashOutline, copyOutline } from 'ionicons/icons';
import './MessageSent.css';

const MessageSent = ({ _id, message, timestamp }) => {
    const [showMessagesOptions, setShowMessagesOptions] = useState(false);
    const optionsRef = useRef(null);
    const buttonRef = useRef(null);

    // Cerrar menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target) && 
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setShowMessagesOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionsClick = (_id) => {
        console.log("Options clicked, Key:", _id);
        setShowMessagesOptions(!showMessagesOptions);
    }

    const handleCopyMessage = (_id) => {
        console.log("Copy message clicked, Key:", _id);
        navigator.clipboard.writeText(message);
        setShowMessagesOptions(false);
    }

    const handleViewInfo = () => {
        console.log("View info clicked");
        setShowMessagesOptions(false);
    }

    const handleDeleteMessage = (_id) => {
        console.log("Delete message clicked, Key:", _id);
        setShowMessagesOptions(false);
    }

    console.log("MessageSent component rendered with key:", _id);
    
    return (
        <div className="sent">
            <div className="options-container" ref={optionsRef}>
                <button 
                    className='options-button' 
                    onClick={() => handleOptionsClick(_id)}
                    ref={buttonRef}
                >
                    <IonIcon className="icon" icon={ellipsisVerticalOutline} />
                </button>
                
                {showMessagesOptions && (
                    <div className="messages-options-dropdown">
                        <button className="messages-option" onClick={handleViewInfo}>
                            <IonIcon icon={eyeOutline} />
                            Info
                        </button>
                        <button className="messages-option" onClick={() => handleCopyMessage(_id)}>
                            <IonIcon icon={copyOutline} />
                            Copiar mensaje
                        </button>
                        <button className="messages-option delete" onClick={() => handleDeleteMessage(_id)}>
                            <IonIcon icon={trashOutline} />
                            Eliminar mensaje
                        </button>
                    </div>
                )}
            </div>
            
            <div className="message-sent">
                <p>{message}</p>
                <span className="timestamp">{timestamp}</span>
            </div>
        </div>
    );
};

export default MessageSent;
