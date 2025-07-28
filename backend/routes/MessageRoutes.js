import express from 'express';
import Message from '../models/Message.js';

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
 * Marcar un mensaje como leído
 */
router.post('/read/:messageId', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.messageId,
      { read: true },
      { new: true }
    );

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: 'Error al marcar como leído' });
  }
});

export default router;