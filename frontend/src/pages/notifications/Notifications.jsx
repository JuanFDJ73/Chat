import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowBackCircle } from 'ionicons/icons';
import './Notifications.css';

const Notifications = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="notifications">
                <div className="notifications-container">
                    <div>
                        <button onClick={() => navigate('/Settings')} className="">
                            <IonIcon className="icon" icon={arrowBackCircle} />
                        </button>
                        <h1>Notifications</h1>
                        <p>This is the Notifications page.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notifications;