import Conversation from '../../models/Conversation.js';

/**
 * Crear una nueva conversación entre usuarios
 */
export const createConversation = async (req, res) => {
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
};
