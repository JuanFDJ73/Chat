import './MistakeModal.css';

// Modal para mostrar errores o mensajes informativos
const MistakeModal = ({ title, text, onAccept, onClose }) => {
    return (
        <div className="overlay">
            <div className="modal">
                <button className="closeBtn" onClick={onClose}>×</button>
                <h2>{title}</h2>
                <p>{text}</p>
                <button className="acceptBtn" onClick={onAccept}>Aceptar</button>
            </div>
        </div>
    );
};

export default MistakeModal;