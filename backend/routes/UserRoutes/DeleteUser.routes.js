import User from '../../models/User.js';
import Message from '../../models/Message.js';
import Conversation from '../../models/Conversation.js';

/**
 * Eliminar descripción
 */
export const deleteDescription = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    user.description = null;
    await user.save();

    res.json({ message: 'Descripción eliminada' });
  } catch (err) {
    console.error('Error al eliminar descripción:', err);
    res.status(500).json({ error: 'Error al eliminar descripción' });
  }
};

/**
 * Eliminar photo URL
 */
export const deletePhotoURL = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    user.photoURL = null;
    user.updatedAt = new Date();
    await user.save();

    res.json({ message: 'Photo URL eliminada', user });
  } catch (err) {
    console.error('Error al eliminar photo URL:', err);
    res.status(500).json({ error: 'Error al eliminar photo URL' });
  }
};

/**
 * Eliminar contacto
 */
export const deleteContact = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    user.contacts = user.contacts.filter(c => c.uid !== req.params.contactUid);
    await user.save();

    res.json({ message: 'Contacto eliminado', contacts: user.contacts });
  } catch (err) {
    console.error('Error al eliminar contacto:', err);
    res.status(500).json({ error: 'Error al eliminar contacto' });
  }
};

/**
 * Eliminar contacto completamente (contacto + mensajes)
 */
export const deleteContactCompletely = async (req, res) => {
  try {
    const { uid, contactUid } = req.params;

    //Buscar al usuario
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    //Buscar la conversación entre estos dos usuarios
    const conversation = await Conversation.findOne({
      participants: { $all: [uid, contactUid], $size: 2 }
    });

    if (conversation) {
      //Eliminar todos los mensajes de la conversación para este usuario
      const messages = await Message.find({ conversationId: conversation._id });

      if (messages.length > 0) {
        const updatePromises = messages.map(message => {
          // Agregar el UID del usuario al array isDeletedBy
          if (!message.isDeletedBy) {
            message.isDeletedBy = [];
          }

          if (!message.isDeletedBy.includes(uid)) {
            message.isDeletedBy.push(uid);
            return message.save();
          }
          return Promise.resolve();
        });

        await Promise.all(updatePromises);
        console.log(`${messages.length} mensajes marcados como eliminados para el usuario ${uid}`);
      }
    }

    // Eliminar contacto de la lista del usuario
    user.contacts = user.contacts.filter(c => c.uid !== contactUid);
    await user.save();

    res.json({
      message: 'Contacto eliminado completamente',
      deletedMessagesCount: conversation ? (await Message.find({ conversationId: conversation._id })).length : 0,
      conversationId: conversation?._id
    });
  } catch (err) {
    console.error('Error al eliminar contacto completamente:', err);
    res.status(500).json({ error: 'Error al eliminar contacto completamente' });
  }
};

/**
 * Eliminar usuario (soft delete)
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { uid: req.params.uid },
      { isDeleted: true, updatedAt: new Date() },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar usuario:', err);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
