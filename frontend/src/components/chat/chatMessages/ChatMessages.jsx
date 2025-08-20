import React, { useState, useEffect, useCallback, useRef } from 'react';
import MessageSent from '../messages/MessageSent.jsx';
import MessageReceived from '../messages/MessageReceived.jsx';
import messagesApi from '../../../services/api/messages.js';
import socketService from '../../../services/socket.js';
import useAuthStore from '../../../stores/use-auth-store.js';
import { groupMessagesByDay } from '../../../utils/DateUtils';
import DateSeparator from '../messages/DateSeparator';
import './ChatMessages.css';

const ChatMessages = ({ conversationId }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userLogged } = useAuthStore();
    const messagesEndRef = useRef(null);

    // Función para hacer scroll hacia abajo
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Función para agregar mensaje nuevo al estado
    const addNewMessage = useCallback((newMessage) => {
        setMessages(prevMessages => {
            // Verificar si el mensaje ya existe para evitar duplicados
            const messageExists = prevMessages.some(msg => msg._id === newMessage._id);
            if (messageExists) return prevMessages;
            
            return [...prevMessages, newMessage];
        });
    }, []);

    // Scroll hacia abajo cuando cambien los mensajes
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const loadMessages = async () => {
            if (!conversationId) return;
            
            try {
                setLoading(true);
                const messagesData = await messagesApi.getConversationMessages(conversationId);
                setMessages(messagesData);
            } catch (error) {
                console.error('Error loading messages:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMessages();
    }, [conversationId]);

    useEffect(() => {
        if (!userLogged) return;

        // Escuchar mensajes enviados por el usuario actual
        const handleMessageSent = (message) => {
            console.log('Mensaje enviado confirmado:', message);
            if (message.conversationId === conversationId) {
                addNewMessage(message);
            }
        };

        // Escuchar mensajes recibidos de otros usuarios
        const handleReceiveMessage = (message) => {
            console.log('Mensaje recibido:', message);
            if (message.conversationId === conversationId) {
                addNewMessage(message);
            }
        };

        // Suscribirse a los eventos de socket
        const socket = socketService.connect(userLogged.uid);
        socket.on('messageSent', handleMessageSent);
        socket.on('receiveMessage', handleReceiveMessage);

        // Cleanup: remover listeners cuando el componente se desmonte o cambie
        return () => {
            socket.off('messageSent', handleMessageSent);
            socket.off('receiveMessage', handleReceiveMessage);
        };
    }, [userLogged, conversationId, addNewMessage]);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    // Agrupar mensajes por día
    const groupedMessages = groupMessagesByDay(messages || []);

    if (loading) {
        return (
            <div className="chat-messages">
                <div className="loading">Cargando mensajes...</div>
            </div>
        );
    }

    if (!conversationId) {
        return (
            <div className="chat-messages">
                <div className="no-conversation">Selecciona una conversación para ver los mensajes</div>
            </div>
        );
    }

    return (
        <div className="chat-messages">
            {groupedMessages.length === 0 ? (
                <div className="no-messages">No hay mensajes aún</div>
            ) : (
                groupedMessages.map((item, index) => {
                    if (item.type === 'dateSeparator') {
                        return (
                            <DateSeparator 
                                key={item.id} 
                                date={item.date} 
                            />
                        );
                    } else if (item.type === 'message') {
                        // Usar _id del mensaje o fallback al índice
                        const messageKey = item._id || item.id || `message-${index}`;
                        const isCurrentUser = item.sender === userLogged?.id || item.senderId === userLogged?.id;
                        
                        console.log('Message key:', messageKey); // Debug
                        console.log('Message object:', item); // Debug
                        
                        return isCurrentUser ? (
                            <MessageSent 
                                key={messageKey} 
                                message={item} 
                            />
                        ) : (
                            <MessageReceived 
                                key={messageKey} 
                                message={item} 
                            />
                        );
                    }
                    return null; // Para casos inesperados
                })
            )}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatMessages;