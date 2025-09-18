import ChatTop from './chatHeader/ChatTop';
import ChatMessages from './chatMessages/ChatMessages';
import ChatInput from './chatInput/ChatInput';
import './Chat.css';

const Chat = ({ name, image, onBack, activeContact, conversationId }) => {
    return (
        <div className="chat-app">
            <ChatTop
                name={name}
                image={image}
                onBack={onBack}
                contactInfo={activeContact}
            />
            <ChatMessages 
                conversationId={conversationId} 
                contactName={name}
            />
            <ChatInput activeContact={activeContact} conversationId={conversationId} />
        </div>
    );
};

export default Chat;