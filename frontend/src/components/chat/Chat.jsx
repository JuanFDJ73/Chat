import ChatTop from './chatHeader/chatTop';
import ChatMessages from './chatMessages/ChatMessages';
import ChatInput from './chatInput/ChatInput';
import './Chat.css';

const Chat = ({ name, image, onBack }
) => {
    return (
        <div className="chat-app">
            <ChatTop
                name={name}
                image={image}
                onBack={onBack}
            />
            <ChatMessages />
            <ChatInput />
        </div>
    );
};

export default Chat;