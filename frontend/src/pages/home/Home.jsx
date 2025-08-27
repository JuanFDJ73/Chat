import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { sunnyOutline, moonOutline, logOutOutline, settingsOutline, personAddOutline } from 'ionicons/icons';
import { useNavigate } from "react-router-dom";
import useAuthStore from '../../stores/use-auth-store.js';
import socketService from '../../services/socket.js';
import conversationsApi from '../../services/api/conversations.js';
import userApi from '../../services/api/users.js';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import ContactButton from '../../components/ContactButton.jsx';
import AddContactModal from '../../components/modal/AddContactModal.jsx';
import Chat from '../../components/chat/Chat.jsx';
import UserAvatar from '../../components/UserAvatar.jsx';
import './Home.css';
import AuthContainer from '../../components/auth/AuthContainer.jsx';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [contactDataCache, setContactDataCache] = useState(new Map()); // Cache para datos de contactos
  const { loginWithPopup, logout, userLogged, userProfile, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogged && userLogged.uid) {
      // Función para enriquecer conversaciones con datos actualizados de la BD
      const enrichConversationsWithUpdatedData = async (conversations) => {
        try {
          const enrichedConversations = await Promise.all(
            conversations.map(async (conv) => {
              try {
                const contactUid = conv.contactInfo.uid;

                // Verificar si ya tenemos datos en cache
                if (contactDataCache.has(contactUid)) {
                  const cachedData = contactDataCache.get(contactUid);
                  return {
                    ...conv,
                    contactInfo: {
                      ...conv.contactInfo,
                      displayName: cachedData.displayName || conv.contactInfo.displayName,
                      photoURL: cachedData.photoURL || conv.contactInfo.photoURL,
                    }
                  };
                }

                // Obtener datos actualizados del contacto desde la BD
                const contactData = await userApi.getUserByUid(contactUid);

                // Guardar en cache
                setContactDataCache(prev => new Map(prev.set(contactUid, contactData)));

                return {
                  ...conv,
                  contactInfo: {
                    ...conv.contactInfo,
                    // Usar datos de la BD si existen, sino mantener los originales
                    displayName: contactData.displayName || conv.contactInfo.displayName,
                    photoURL: contactData.photoURL || conv.contactInfo.photoURL,
                  }
                };
              } catch (error) {
                // Si hay error obteniendo datos del contacto, usar los originales
                console.warn(`No se pudieron obtener datos actualizados para ${conv.contactInfo.uid}:`, error);
                return conv;
              }
            })
          );

          return enrichedConversations;
        } catch (error) {
          console.error('Error enriqueciendo conversaciones:', error);
          return conversations; // Retornar originales si hay error
        }
      };

      // Función para cargar conversaciones
      const loadConversations = async () => {
        try {
          const data = await conversationsApi.getUserConversations(userLogged);
          console.log("Conversations fetched:", data);

          const enrichedConversations = await enrichConversationsWithUpdatedData(data);
          console.log("Conversations enriched:", enrichedConversations);

          setConversations(enrichedConversations);
        } catch (error) {
          console.error("Error al obtener conversaciones:", error);
        }
      };

      // Función helper para obtener la imagen correcta
      socketService.connect(userLogged.uid);

      // Cargar conversaciones inicialmente
      loadConversations();

      // Escuchar nuevos mensajes para actualizar la lista de conversaciones
      const socket = socketService.connect(userLogged.uid);
      
      const handleMessageUpdate = (message) => {
        console.log('Actualizando lista de conversaciones por nuevo mensaje:', message);
        // Recargar conversaciones cuando llegue un nuevo mensaje
        loadConversations();
      };

      socket.on('messageSent', handleMessageUpdate);
      socket.on('receiveMessage', handleMessageUpdate);

      return () => {
        socket.off('messageSent', handleMessageUpdate);
        socket.off('receiveMessage', handleMessageUpdate);
        
        if (userLogged) {
          socketService.disconnect();
        }
      };
    }
  }, [userLogged]);

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
              {conversations.length === 0 && (
                <p className="no-conversations">No tienes conversaciones aún.</p>
              )}
              {conversations.map(conv => (
                <ContactButton
                  key={conv._id}
                  name={conv.contactInfo.displayName}
                  lastMessage={conv.lastMessage?.content || 'Sin mensajes'}
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
              ))}
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