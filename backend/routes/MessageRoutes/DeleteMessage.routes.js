import Message from '../../models/Message.js';
import Conversation from '../../models/Conversation.js';

/**
 * Eliminar mensaje para un usuario específico
 */
export const deleteMessageForUser = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ error: 'UID de usuario requerido' });
    }

    const message = await Message.findById(messageId);
    
    if (!message) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    // Verificar que el usuario es participante de la conversación
    const conversation = await Conversation.findById(message.conversationId);
    if (!conversation || !conversation.participants.includes(uid)) {
      return res.status(403).json({ error: 'No tienes permisos para eliminar este mensaje' });
    }

    // Agregar el UID al array isDeletedBy si no está ya presente
    if (!message.isDeletedBy.includes(uid)) {
      message.isDeletedBy.push(uid);
      await message.save();
    }

    res.json({ message: 'Mensaje eliminado para el usuario', data: message });
  } catch (err) {
    console.error('Error al eliminar mensaje para usuario:', err);
    res.status(500).json({ error: 'Error al eliminar mensaje' });
  }
};

/**
 * Eliminar mensaje para todos los participantes de la conversación
 */
export const deleteMessageForAll = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ error: 'UID de usuario requerido' });
    }

    const message = await Message.findById(messageId);
    
    if (!message) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    // Verificar que el usuario es el remitente del mensaje
    if (message.sender !== uid) {
      return res.status(403).json({ error: 'Solo puedes eliminar para todos tus propios mensajes' });
    }

    // Obtener todos los participantes de la conversación
    const conversation = await Conversation.findById(message.conversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversación no encontrada' });
    }

    // Agregar todos los participantes al array isDeletedBy
    message.isDeletedBy = [...new Set([...message.isDeletedBy, ...conversation.participants])];
    await message.save();

    res.json({ message: 'Mensaje eliminado para todos los participantes', data: message });
  } catch (err) {
    console.error('Error al eliminar mensaje para todos:', err);
    res.status(500).json({ error: 'Error al eliminar mensaje' });
  }
};

