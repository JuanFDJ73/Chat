import React from 'react';
import { IonIcon } from '@ionic/react';
import { ellipsisVerticalCircleOutline } from 'ionicons/icons';
import './ChatTop.css';

const ChatTop = ({ name,image }
) => {
    return (
        // <--ChatTop component-->
        <div className="chat-top">
            <button className="chat-top-left">
                <img src={image} alt="Avatar" />
                <span>{name}</span>
            </button>
            <div className="chat-top-right">
                <IonIcon className="icon" icon={ellipsisVerticalCircleOutline} />
            </div>
        </div>
        // <--End ChatTop component-->
    );
}

export default ChatTop;