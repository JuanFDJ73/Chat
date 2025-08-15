import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowBackCircle } from 'ionicons/icons';
import './Language.css';

const Language = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="language">
                <div className="language-container">
                    <div>
                        <button onClick={() => navigate('/Settings')} className="">
                            <IonIcon className="icon" icon={arrowBackCircle} />
                        </button>
                        <h1>Language</h1>
                        <p>This is the Language page.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Language;