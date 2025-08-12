import React from 'react';
import { IonIcon } from '@ionic/react';
import { ellipsisVerticalOutline } from 'ionicons/icons';
import './MessageSent.css';

const handleOptionsClick = () => {
    console.log("Options clicked");
}

const MessageSent = ({ message, timestamp }) => {
    return (
        <>
            <div className="sent">
                <button className='options-button' onClick={handleOptionsClick}>
                    <IonIcon className="icon" icon={ellipsisVerticalOutline} />
                </button>
                <div className="message-sent">
                    <p>{message}</p>
                    <span className="timestamp">{timestamp}</span>
                </div>
            </div>
        </>
    );
};

export default MessageSent;
