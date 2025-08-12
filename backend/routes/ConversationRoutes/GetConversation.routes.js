import Conversation from '../../models/Conversation.js';

/**
 * Obtener todas las conversaciones de un usuario
 */
export const getConversationsByUser = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.params.uid
    }).sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener conversaciones' });
  }
};
