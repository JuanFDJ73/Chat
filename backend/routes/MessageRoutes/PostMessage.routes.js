import Message from '../../models/Message.js';
import Conversation from '../../models/Conversation.js';

/**
 * Enviar un nuevo mensaje
 */
export const createMessage = async (req, res) => {
  try {
    const { sender, receiver, content, conversationId, messageType = 'text' } = req.body;

    const message = new Message({
      sender,
      receiver,
      content,
      conversationId,
      messageType
    });

    await message.save();

    // Actualizar la fecha de la conversación
    await Conversation.findByIdAndUpdate(conversationId, {
      updatedAt: new Date()
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
};

/**
 * Marcar un mensaje como leído
 */
export const markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.messageId,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: 'Error al marcar como leído' });
  }
};
