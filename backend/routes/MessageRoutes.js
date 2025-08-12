import express from 'express';
import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';

const router = express.Router();

/**
 * Obtener todos los mensajes de una conversación
 */
router.get('/:conversationId', async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId
    }).sort({ timestamp: 1 }); // del más antiguo al más nuevo

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
});

/**
 * Enviar un nuevo mensaje
 */
router.post('/', async (req, res) => {
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
});

/**
 * Marcar un mensaje como leído
 */
router.post('/read/:messageId', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.messageId,
      { isRead: true },
      { new: true }
    );

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: 'Error al marcar como leído' });
  }
});

export default router;