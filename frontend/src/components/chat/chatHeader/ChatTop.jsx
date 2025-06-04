import React from 'react';
import { IonIcon } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import { ellipsisVerticalCircleOutline } from 'ionicons/icons';
import { chevronBackOutline } from 'ionicons/icons';
import './ChatTop.css';

const ChatTop = ({ name, image }
) => {
    return (
        // <--ChatTop component-->
        <div className="chat-top">

            <div className="chat-top-left">
                <button className='back-button'>
                    <IonIcon className="icon" icon={chevronBackOutline} />
                </button>
                <button className="avatar-buttton-chat">
                    <IonIcon className="avatar" icon={personCircleOutline} />
                    <span>{name}</span>
                </button>
            </div>
            <div className="chat-top-right">
                <IonIcon className="icon" icon={ellipsisVerticalCircleOutline} />
            </div>
        </div>
        // <--End ChatTop component-->
    );
}

export default ChatTop;