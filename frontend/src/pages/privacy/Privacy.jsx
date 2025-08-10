import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowBackCircle } from 'ionicons/icons';
import './Privacy.css';

const Privacy = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="Privacy">
                <div className="Privacy-container">
                    <div>
                        <button onClick={() => navigate('/settings')} className="">
                            <IonIcon className="icon" icon={arrowBackCircle} />
                        </button>
                        <h1>Privacy</h1>
                        <p>This is the Privacy page.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Privacy;