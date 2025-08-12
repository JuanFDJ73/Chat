import React from 'react';
import { IonIcon } from '@ionic/react';
import { ellipsisVerticalOutline } from 'ionicons/icons';
import './MessageReceived.css';

const handleOptionsClick = () => {
    console.log("Options clicked");
}

const MessageReceived = ({ message, timestamp }) => {
    return (
        <>
            <div className="received">
                <div className="message-received">
                    <p>{message}</p>
                    <span className="timestamp">{timestamp}</span>
                </div>
                <button className='options-button' onClick={handleOptionsClick}>
                    <IonIcon className="icon" icon={ellipsisVerticalOutline} />
                </button>
            </div>
        </>
    );
};

export default MessageReceived;
