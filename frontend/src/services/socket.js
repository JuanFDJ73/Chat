import { io } from 'socket.io-client';

class SocketService {
    constructor() {
        this.socket = null;
        this.isConnected = false;
    }

    connect(userUid) {
        if (!this.socket) {
            this.socket = io('http://localhost:5000', {
                transports: ['websocket'],
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
            });

            this.socket.on('connect', () => {
                console.log('Conectado al servidor de Socket.IO');
                this.isConnected = true;
                
                // Unirse a la sala personal del usuario
                this.socket.emit('joinRoom', userUid);
            });

            this.socket.on('disconnect', () => {
                console.log('Desconectado del servidor');
                this.isConnected = false;
            });

            this.socket.on('messageSent', (message) => {
                console.log('Mensaje guardado correctamente:', message);
            });

            this.socket.on('receiveMessage', (message) => {
                console.log('Nuevo mensaje recibido:', message);
            });

            this.socket.on('errorMessage', (error) => {
                console.error('Error al enviar mensaje:', error);
            });
        }
        return this.socket;
    }

    sendMessage(messageData) {
        if (this.socket && this.isConnected) {
            this.socket.emit('sendMessage', messageData);
        } else {
            console.error('Socket no está conectado');
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
        }
    }
}

export default new SocketService();