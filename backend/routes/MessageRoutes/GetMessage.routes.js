import Message from '../../models/Message.js';

/**
 * Obtener todos los mensajes de una conversación
 */
export const getMessagesByConversation = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId
    }).sort({ timestamp: 1 }); // del más antiguo al más nuevo

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
};

/**
 * Obtener un mensaje específico por ID
 */
export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    
    if (!message) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener mensaje' });
  }
};
