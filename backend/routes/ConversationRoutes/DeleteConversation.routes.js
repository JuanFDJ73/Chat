import Conversation from '../../models/Conversation.js';

/**
 * Eliminar una conversación
 */
export const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findByIdAndDelete(req.params.id);
    
    if (!conversation) {
      return res.status(404).json({ error: 'Conversación no encontrada' });
    }

    res.json({ message: 'Conversación eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar conversación' });
  }
};
