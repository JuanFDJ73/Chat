import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowBackCircle } from 'ionicons/icons';
import './About.css';

const About = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="About">
                <div className="About-container">
                    <div>
                        <button onClick={() => navigate('/settings')} className="">
                            <IonIcon className="icon" icon={arrowBackCircle} />
                        </button>
                        <h1>About</h1>
                        <p>This is the About page.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;