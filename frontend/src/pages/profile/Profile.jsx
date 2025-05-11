import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowBackCircle } from 'ionicons/icons';
import './Profile.css';
import useAuthStore from '../../stores/use-auth-store';


const Profile = () => {
    const navigate = useNavigate();
    const { userLogged, isLoading } = useAuthStore();

    return (
        <>
            <div className="Profile">
                <div className="Profile-container">
                    <div>
                        <button onClick={() => navigate('/')} className="">
                            <IonIcon className="icon" icon={arrowBackCircle} />
                        </button>
                        <h1>Profile</h1>
                        <p>This is the Profile page.</p>
                    </div>
                    <div className="Profile-image">
                        <img src={userLogged.photoURL || './perfil.png'} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;