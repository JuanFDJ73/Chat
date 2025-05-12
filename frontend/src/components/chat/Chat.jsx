import { IonIcon } from '@ionic/react';
import { ellipsisVerticalCircleOutline } from 'ionicons/icons';
import ChatTop from './chatHeader/chatTop';
import ChatMessages from './chatMessages/ChatMessages';
import ChatInput from './chatInput/ChatInput';
import './Chat.css';

const Chat = ({ name, image }
) => {
    return (
        <div className="chat-app">
            <ChatTop
                name={name}
                image={image}
            />
            <ChatMessages />
            <ChatInput />
        </div>
    );
};

export default Chat;