import ChatTop from './chatHeader/ChatTop';
import ChatMessages from './chatMessages/ChatMessages';
import ChatInput from './chatInput/ChatInput';
import './Chat.css';

const Chat = ({ name, image, onBack, activeContact }) => {
    return (
        <div className="chat-app">
            <ChatTop
                name={name}
                image={image}
                onBack={onBack}
            />
            <ChatMessages />
            <ChatInput activeContact={activeContact} />
        </div>
    );
};

export default Chat;