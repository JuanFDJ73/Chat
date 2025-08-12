import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';
import User from '../models/User.js';

// Mapa de usuarios conectados (para controlar múltiples sockets por usuario)
const onlineUsers = new Map();

export default function socketHandler(io) {
    io.on('connection', (socket) => {
        console.log('Usuario conectado');

        let currentUid = null;

        // Un usuario se une a su propia sala personal
        socket.on('joinRoom', (uid) => {
            currentUid = uid;
            socket.join(uid.toString());

            // Guardar el socket en el mapa
            if (!onlineUsers.has(uid)) {
                onlineUsers.set(uid, []);
            }
            onlineUsers.get(uid).push(socket.id);

            io.emit('userOnline', uid); // Notificar a todos que este usuario está online
        });

        // Evento de escritura
        socket.on('typing', ({ from, to }) => {
            io.to(to.toString()).emit('typing', { from });
        });

        socket.on('stopTyping', ({ from, to }) => {
            io.to(to.toString()).emit('stopTyping', { from });
        });

        // Envío de mensaje
        socket.on('sendMessage', async (data) => {
            const { sender, receiver, content, conversationId } = data;

            try {
                const receiverUser = await User.findOne({ uid: receiver });
                if (receiverUser?.blockedUsers.includes(sender)) {
                    return; // Bloqueado: no hacer nada
                }

                // Usar conversationId si se proporciona, sino buscar o crear conversación
                let conversation;
                if (conversationId) {
                    conversation = await Conversation.findById(conversationId);
                } else {
                    conversation = await Conversation.findOne({
                        participants: { $all: [sender, receiver], $size: 2 }
                    });

                    if (!conversation) {
                        conversation = new Conversation({ participants: [sender, receiver] });
                        await conversation.save();
                    }
                }

                // Crear mensaje
                const newMessage = new Message({
                    conversationId: conversation._id,
                    sender,
                    receiver,
                    content,
                    timestamp: new Date()
                });

                await newMessage.save();

                // Actualizar conversación
                conversation.updatedAt = newMessage.timestamp;
                await conversation.save();

                // Crear objeto de mensaje con conversationId para el frontend
                const messageToEmit = {
                    ...newMessage.toObject(),
                    conversationId: conversation._id.toString()
                };

                // Emitir al receptor y al emisor
                io.to(receiver.toString()).emit('receiveMessage', messageToEmit);
                io.to(sender.toString()).emit('messageSent', messageToEmit);

            } catch (error) {
                console.error('Error al enviar mensaje:', error);
                socket.emit('errorMessage', 'Error al enviar el mensaje');
            }
        });

        // Al desconectarse
        socket.on('disconnect', () => {
            console.log('Usuario desconectado');

            if (currentUid && onlineUsers.has(currentUid)) {
                const sockets = onlineUsers.get(currentUid).filter(id => id !== socket.id);

                if (sockets.length === 0) {
                    onlineUsers.delete(currentUid);
                    io.emit('userOffline', currentUid); // Notificar que se desconectó
                } else {
                    onlineUsers.set(currentUid, sockets); // Aún tiene otros sockets activos
                }
            }
        });
    });
}