import React from 'react';
import { IonIcon } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import { ellipsisVerticalCircleOutline } from 'ionicons/icons';
import { chevronBackOutline } from 'ionicons/icons';
import ContactAvatar from '../../ContactAvatar.jsx';
import './ChatTop.css';

const ChatTop = ({ name, image, onBack }) => {
    return (
        // <--ChatTop component-->
         <div className="chat-top">
            <div className="chat-top-left">
                <button className='back-button-chat' onClick={onBack}>
                    <IonIcon className="icon" icon={chevronBackOutline} />
                </button>
                <button className="avatar-buttton-chat">
                    <ContactAvatar 
                        photoURL={image} 
                        displayName={name} 
                        size="normal" 
                        className="avatar" 
                    />
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