import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { sunnyOutline, moonOutline, logOutOutline, settingsOutline, personAddOutline } from 'ionicons/icons';
import { useNavigate } from "react-router-dom";
import useAuthStore from '@stores/use-auth-store.js';
import useConversationsStore from '@stores/use-conversations-store.js';
import socketService from '@services/socket.js';
import LoadingSpinner from '@components/LoadingSpinner.jsx';
import ContactButton from '@components/ContactButton.jsx';
import AddContactModal from '@components/modal/home/AddContactModal.jsx';
import Chat from '@components/chat/Chat.jsx';
import UserAvatar from '@components/UserAvatar.jsx';
import './Home.css';
import AuthContainer from '@components/auth/AuthContainer.jsx';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeContact, setActiveContact] = useState(null);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  
  const { loginWithPopup, logout, userLogged, userProfile, isLoading } = useAuthStore();
  const { 
    conversations, 
    isLoading: conversationsLoading, 
    loadConversations, 
    updateLastMessage,
    clearCache 
  } = useConversationsStore();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogged && userLogged.uid) {
      // Conectar socket
      socketService.connect(userLogged.uid);

      // Cargar conversaciones usando el store (con cache automático)
      loadConversations(userLogged);

      // Escuchar nuevos mensajes para actualizar la lista de conversaciones
      const socket = socketService.connect(userLogged.uid);
      
      const handleMessageSent = (message) => {
        console.log('Mensaje enviado por mí:', message);
        
        // Cuando yo envío un mensaje, siempre es del usuario actual
        if (message.conversationId) {
          updateLastMessage(message.conversationId, {
            content: message.content,
            isFromCurrentUser: true, // Siempre true para mensajes enviados
            timestamp: message.timestamp
          });
        }
      };

      const handleMessageReceived = (message) => {
        console.log('Mensaje recibido de otro usuario:', message);
        
        // Cuando recibo un mensaje, nunca es del usuario actual
        if (message.conversationId) {
          updateLastMessage(message.conversationId, {
            content: message.content,
            isFromCurrentUser: false, // Siempre false para mensajes recibidos
            timestamp: message.timestamp
          });
          
          // Recargar conversaciones para detectar conversaciones nuevas que se hacen visibles
          loadConversations(userLogged, true);
        }
      };

      socket.on('messageSent', handleMessageSent);
      socket.on('receiveMessage', handleMessageReceived);

      return () => {
        socket.off('messageSent', handleMessageSent);
        socket.off('receiveMessage', handleMessageReceived);
        
        if (userLogged) {
          socketService.disconnect();
        }
      };
    }
  }, [userLogged, loadConversations, updateLastMessage]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  const goToSettings = () => {
    userLogged ? navigate('/Settings') : navigate('/');
  };

  const goToProfile = () => {
    userLogged ? navigate('/Profile') : navigate('/');
  };

  const handleAddContact = () => {
    console.log("Nuevo contacto agregado");
    // Invalidar cache para recargar conversaciones
    loadConversations(userLogged, true);
  };

  const openAddContactModal = () => {
    setIsAddContactModalOpen(true);
  };

  const closeAddContactModal = () => {
    setIsAddContactModalOpen(false);
  };

  const handleContactClick = (contactData) => {
    setActiveContact(contactData);
  };

  // Limpiar cache cuando el usuario se deslogea
  useEffect(() => {
    if (!userLogged) {
      clearCache();
    }
  }, [userLogged, clearCache]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="home">
      {userLogged ? (
        <>
          <div className="home-left">
            <div className='home-up'>
              <h1 className="home-title">Chat App</h1>
              <div className="dark-toggle" onClick={toggleDarkMode}>
                <div className="circle">
                  <IonIcon className={`icon sun ${darkMode ? "hidden" : ""}`} icon={sunnyOutline} />
                  <IonIcon className={`icon moon ${darkMode ? "" : "hidden"}`} icon={moonOutline} />
                </div>
              </div>
            </div>
            <div className="home-chat">
              {conversationsLoading && conversations.length === 0 ? (
                <div className="conversations-loading">
                  <div className="conversations-loading-spinner"></div>
                </div>
              ) : conversations.length === 0 ? (
                <p className="no-conversations">No tienes conversaciones aún.</p>
              ) : (
                conversations.map(conv => (
                  <ContactButton
                    key={conv._id}
                    name={conv.contactInfo.displayName}
                    lastMessage={conv.lastMessage?.content || ''}
                    image={conv.contactInfo.photoURL}
                    isLastMessageFromCurrentUser={conv.lastMessage?.isFromCurrentUser || false}
                    onClick={() => handleContactClick({
                      name: conv.contactInfo.displayName,
                      uid: conv.contactInfo.uid,
                      image: conv.contactInfo.photoURL,
                      hasNickname: conv.contactInfo.hasNickname,
                      conversationId: conv._id
                    })}
                  />
                ))
              )}
            </div>
            <div className='home-options'>
              <button className="home-button user" onClick={goToProfile}>
                <UserAvatar className="home-avatar" size="normal" />
              </button>
              <button className="home-button add" onClick={openAddContactModal}>
                <IonIcon className="icon add" icon={personAddOutline} />
              </button>
              <button className="home-button settings" onClick={goToSettings}>
                <IonIcon className="icon settings" icon={settingsOutline} />
              </button>
              <button className="home-button logout" onClick={logout}>
                <IonIcon className="icon logout" icon={logOutOutline} />
              </button>
            </div>
          </div>
          <div className={`home-right ${activeContact ? 'active' : ''}`}>
            {activeContact ? (
              // Si hay un contacto activo, mostrar el chat
              <Chat
                name={activeContact.name}
                image={activeContact.image}
                onBack={() => setActiveContact(null)}
                activeContact={activeContact}
                conversationId={activeContact.conversationId}
              />
            ) : (
              <img
                src="./wallpaper.jpg"
                alt="Chat Illustration"
                className="home-image"
              />
            )}
          </div>
        </>
      ) : (
        <AuthContainer />
      )}

      {/* Modal para agregar contacto */}
      <AddContactModal
        isOpen={isAddContactModalOpen}
        onClose={closeAddContactModal}
        onContactAdded={handleAddContact} // Pasar la función de callback
      />
    </div>
  );
};

export default Home;