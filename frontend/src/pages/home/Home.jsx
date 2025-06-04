import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuthStore from '../../stores/use-auth-store.js';
import { sunnyOutline, moonOutline, logOutOutline, settingsOutline, personAddOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import ContactButton from '../../components/ContactButton.jsx';
import Chat from '../../components/chat/chat.jsx';
import './Home.css';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeContact, setActiveContact] = useState(null);
  const { loginWithPopup, logout, userLogged, isLoading } = useAuthStore();
  const navigate = useNavigate();

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
              {/* Contacto ejemplo */}
              <ContactButton
                name="User Prueba 1"
                // image="/perfil.png"
                lastMessage="Prueba de último mensaje"
                onClick={() => setActiveContact({ name: "User Prueba 1" })}
              />
              <ContactButton
                name="User Prueba 2"
                // image="/perfil.png"
                lastMessage="Prueba de último mensaje2"
                onClick={() => setActiveContact({ name: "User Prueba 2" })}
              />
            </div>
            <div className='home-options'>
              <button className="home-button user" onClick={goToProfile}>
                {userLogged.photoURL ? (
                  <img
                    src={userLogged.photoURL}
                    alt="Avatar"
                    className="home-avatar"
                  />
                ) : (
                  <IonIcon className="home-avatar" icon={personAddOutline} />
                )}
              </button>
              <button className="home-button add">
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
          <div className="home-right">
            {activeContact ? (
              // Si hay un contacto activo, muestra el chat
              <Chat name={activeContact.name} image={activeContact.image} onBack={() => setActiveContact(null)} />
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
                  Sign in with Google
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;