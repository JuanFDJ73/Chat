import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">Oops! La página que buscas no se encuentra.</p>
                <button onClick={() => navigate('/')} className="not-found-button">
                    Volver al inicio
                </button>
            </div>
        </div>
    );
};

export default NotFound;
