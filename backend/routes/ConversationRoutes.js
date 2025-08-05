import express from 'express';
import Conversation from '../models/Conversation.js';

const router = express.Router();

/**
 * Crear una nueva conversación entre usuarios
 */
router.post('/', async (req, res) => {
  const { participants } = req.body;

  try {
    // Buscar si ya existe una conversación con esos participantes
    const existing = await Conversation.findOne({
      participants: { $all: participants, $size: participants.length }
    });

    if (existing) return res.status(200).json(existing);

    const conversation = new Conversation({ participants });
    await conversation.save();

    res.status(201).json(conversation);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear conversación' });
  }
});

/**
 * Obtener todas las conversaciones de un usuario
 */
router.get('/:uid', async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.params.uid
    }).sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener conversaciones' });
  }
});

export default router;
