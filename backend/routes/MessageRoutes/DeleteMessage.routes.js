import Message from '../../models/Message.js';

/**
 * Eliminar un mensaje (soft delete)
 */
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.messageId,
      { isDeleted: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    res.json({ message: 'Mensaje eliminado correctamente', data: message });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar mensaje' });
  }
};

/**
 * Eliminar un mensaje permanentemente
 */
export const deleteMessagePermanently = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.messageId);

    if (!message) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    res.json({ message: 'Mensaje eliminado permanentemente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar mensaje permanentemente' });
  }
};
