import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowBackCircle } from 'ionicons/icons';
import './Help.css';

const Help = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="Help">
                <div className="Help-container">
                    <div>
                        <button onClick={() => navigate('/Settings')} className="">
                            <IonIcon className="icon" icon={arrowBackCircle} />
                        </button>
                        <h1>Help</h1>
                        <p>This is the Help page.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Help;