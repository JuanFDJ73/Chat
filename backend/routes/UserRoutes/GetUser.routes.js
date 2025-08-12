import User from '../../models/User.js';
import Conversation from '../../models/Conversation.js';

/**
 * Obtener todos los usuarios (útil para mostrar lista de contactos)
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-_id uid displayName email photoURL'); // excluye _id interno
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

/**
 * Obtener un usuario por su UID
 */
export const getUserByUid = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
};

/**
 * Obtener un usuario por su email
 */
export const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
};

/**
 * Obtener conversaciones con nombres personalizados y último mensaje
 */
export const getConversationsWithNames = async (req, res) => {
  try {
    const Message = (await import('../../models/Message.js')).default;
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Obtener conversaciones básicas
    const conversations = await Conversation.find({
      participants: req.params.uid
    }).sort({ updatedAt: -1 });

    // Enriquecer con información de contactos y último mensaje
    const enrichedConversations = await Promise.all(
      conversations.map(async (conv) => {
        const otherParticipantUid = conv.participants.find(p => p !== req.params.uid);

        // Buscar en la lista de contactos del usuario
        const userContact = user.contacts.find(c => c.uid === otherParticipantUid);

        let displayName = otherParticipantUid; // Fallback por defecto
        let photoURL = null;

        // Si tiene el contacto agregado y tiene nickname, usarlo
        if (userContact && userContact.nickname) {
          displayName = userContact.nickname;
        } else {
          // Si no tiene nickname, buscar el displayName real del usuario
          const contactUser = await User.findOne({ uid: otherParticipantUid });
          if (contactUser) {
            displayName = contactUser.displayName;
            photoURL = contactUser.photoURL;
          }
        }

        // Obtener último mensaje de la conversación
        const lastMessage = await Message.findOne({
          conversationId: conv._id
        }).sort({ timestamp: -1 });

        return {
          ...conv.toObject(),
          contactInfo: {
            uid: otherParticipantUid,
            displayName,
            photoURL,
            hasNickname: userContact?.nickname ? true : false
          },
          lastMessage: lastMessage ? {
            content: lastMessage.content,
            timestamp: lastMessage.timestamp,
            sender: lastMessage.sender,
            isFromCurrentUser: lastMessage.sender === req.params.uid
          } : null
        };
      })
    );

    res.json(enrichedConversations);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error al obtener conversaciones' });
  }
};

/**
 * Obtener displayName
 */
export const getDisplayName = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ displayName: user.displayName });
  } catch (err) {
    console.error('Error al obtener display name:', err);
    res.status(500).json({ error: 'Error al obtener display name' });
  }
};

/**
 * Obtener descripción
 */
export const getDescription = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ description: user.description });
  } catch (err) {
    console.error('Error al obtener descripción:', err);
    res.status(500).json({ error: 'Error al obtener descripción' });
  }
};

/**
 * Obtener photo URL
 */
export const getPhotoURL = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ photoURL: user.photoURL || null });
  } catch (err) {
    console.error('Error al obtener photo URL:', err);
    res.status(500).json({ error: 'Error al obtener photo URL' });
  }
};
