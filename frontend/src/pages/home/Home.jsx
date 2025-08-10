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

      // Función helper para obtener la imagen correcta
      socketService.connect(userLogged.uid);

      // Obtener conversaciones del usuario
      conversationsApi.getUserConversations(userLogged)
        .then(async (data) => {
          console.log("Conversations fetched:", data);

          // Enriquecer con datos actualizados de la BD
          const enrichedConversations = await enrichConversationsWithUpdatedData(data);
          console.log("Conversations enriched:", enrichedConversations);

          setConversations(enrichedConversations);
        })
        .catch(error => {
          console.error("Error al obtener conversaciones:", error);
        });
    }

    return () => {
      if (userLogged) {
        socketService.disconnect();
      }
    };
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
                  name={conv.contactInfo.displayName} // Usar el nombre personalizado
                  lastMessage={conv.lastMessage?.text || 'Sin mensajes'}
                  image={conv.contactInfo.photoURL}
                  onClick={() => handleContactClick({
                    name: conv.contactInfo.displayName,
                    uid: conv.contactInfo.uid,
                    image: conv.contactInfo.photoURL,
                    hasNickname: conv.contactInfo.hasNickname
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
        <div className="home-container">
          <div className="home-login">
            <button onClick={loginWithPopup} className="gsi-material-button">
              <div className="gsi-material-button-state"></div>
              <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    style={{ display: 'block' }}
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span className="gsi-material-button-contents">
                  Iniciar sesión con Google
                </span>
              </div>
            </button>
          </div>
        </div>
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