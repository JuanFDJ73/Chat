import React, { useState } from "react";
import './ViewImageModal.css';

export default function ViewImageModal({ open, onClose, imageUrl }) {
    if (!open) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="view-image-modal" onClick={handleBackdropClick}>
            <div className="image-container">
                <button 
                    className="close-button-image-modal"
                    onClick={onClose} 
                    aria-label="Cerrar"
                >
                    &times;
                </button>
                <img src={imageUrl} alt="Vista" className="modal-image" />
            </div>
        </div>
    );
}