import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowBackCircleOutline, arrowBackCircle } from 'ionicons/icons';
import './Settings.css';


const Settings = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <div className="Settings">
                <div className="Settings-container">

                    <div>
                        <button onClick={() => navigate('/')} className="">
                            <IonIcon className="icon" icon={arrowBackCircle} />
                        </button>
                        <h1>Settings</h1>
                        <p>This is the Settings page.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;