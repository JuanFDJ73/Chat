import React from 'react';
import { IonIcon } from '@ionic/react';
import { checkmarkDone } from 'ionicons/icons';
import { personCircleOutline } from 'ionicons/icons';
import ContactAvatar from './ContactAvatar.jsx';
import './ContactButton.css';

const ContactButton = ({ name, image, lastMessage, onClick }) => {
  return (
    <button className="contact" onClick={onClick}>
      <ContactAvatar 
        photoURL={image} 
        displayName={name} 
        size="normal" 
        className="contact-image" 
      />
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
