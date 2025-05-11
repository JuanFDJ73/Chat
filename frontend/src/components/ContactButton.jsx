// src/components/ContactButton.jsx
import React from 'react';
import { IonIcon } from '@ionic/react';
import { checkmarkDone } from 'ionicons/icons';
import './ContactButton.css';

const ContactButton = ({ name, image, lastMessage }) => {
  return (
    <button className="contact">
      <img src={image || '/perfil.png'} className="contact-image" />
      <div className="contact-info">
        <div className="contact-title">{name}</div>
        <div className="contact-last-message">
          <div className="view">
            <IonIcon className="icon check" icon={checkmarkDone} />
          </div>
          <div className="last-message">
            <p>{lastMessage}</p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ContactButton;
