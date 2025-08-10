import express from 'express';
import User from '../models/User.js';
import Conversation from '../models/Conversation.js';

const router = express.Router();


//Obtener todos los usuarios (útil para mostrar lista de contactos)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '-_id uid displayName email photoURL'); // excluye _id interno
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

//Obtener un usuario por su UID
router.get('/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
});

//Obtener un usuario por su email
router.get('/email/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
});

//Registrar un nuevo usuario (por ejemplo, al hacer login con Google por primera vez)
router.post('/register', async (req, res) => {
  const { uid, displayName, email, photoURL } = req.body;

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, displayName, email, photoURL });
      await user.save();
    }

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

//Bloquear a otro usuario
router.post('/:uid/block/:targetUid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    const targetUid = Number(req.params.targetUid);

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    if (!user.blockedUsers.includes(targetUid)) {
      user.blockedUsers.push(targetUid);
      await user.save();
    }

    res.json({ blockedUsers: user.blockedUsers });
  } catch (err) {
    res.status(500).json({ error: 'Error al bloquear usuario' });
  }
});

//Desbloquear a un usuario
router.post('/:uid/unblock/:targetUid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    const targetUid = Number(req.params.targetUid);

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    user.blockedUsers = user.blockedUsers.filter(id => id !== targetUid);
    await user.save();

    res.json({ blockedUsers: user.blockedUsers });
  } catch (err) {
    res.status(500).json({ error: 'Error al desbloquear usuario' });
  }
});

// Agregar contacto
router.post('/:uid/contacts', async (req, res) => {
  try {
    const { contactUid, nickname } = req.body;
    const user = await User.findOne({ uid: req.params.uid });

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Verificar que el contacto existe
    const contactExists = await User.findOne({ uid: contactUid });
    if (!contactExists) return res.status(404).json({ error: 'Contacto no encontrado' });

    // Verificar si ya está agregado
    const existingContact = user.contacts.find(c => c.uid === contactUid);
    if (existingContact) {
      return res.status(400).json({ error: 'Contacto ya agregado' });
    }

    user.contacts.push({ uid: contactUid, nickname });
    await user.save();

    res.json({ message: 'Contacto agregado', contact: { uid: contactUid, nickname } });
  } catch (err) {
    console.error('Error al agregar contacto:', err);
    res.status(500).json({ error: 'Error al agregar contacto' });
  }
});

// Actualizar nickname de contacto
router.put('/:uid/contacts/:contactUid', async (req, res) => {
  try {
    const { nickname } = req.body;
    const user = await User.findOne({ uid: req.params.uid });

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const contact = user.contacts.find(c => c.uid === req.params.contactUid);
    if (!contact) return res.status(404).json({ error: 'Contacto no encontrado' });

    contact.nickname = nickname;
    await user.save();

    res.json({ message: 'Nickname actualizado', contact });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar nickname' });
  }
});

// Obtener conversaciones con nombres personalizados
router.get('/:uid/conversations-with-names', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Obtener conversaciones básicas
    const conversations = await Conversation.find({
      participants: req.params.uid
    }).populate('lastMessage');

    // Enriquecer con información de contactos
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

        return {
          ...conv.toObject(),
          contactInfo: {
            uid: otherParticipantUid,
            displayName,
            photoURL,
            hasNickname: userContact?.nickname ? true : false
          }
        };
      })
    );

    res.json(enrichedConversations);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error al obtener conversaciones' });
  }
});

// Obtener displayName
router.get('/:uid/display-name', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ displayName: user.displayName });
  } catch (err) {
    console.error('Error al obtener display name:', err);
    res.status(500).json({ error: 'Error al obtener display name' });
  }
});

//Cambiar displayName
router.put('/:uid/display-name', async (req, res) => {
  try {
    const { displayName } = req.body;
    const user = await User.findOne({ uid: req.params.uid });

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    user.displayName = displayName;
    await user.save();

    res.json({ message: 'Display name actualizado', user });
  } catch (err) {
    console.error('Error al actualizar display name:', err);
    res.status(500).json({ error: 'Error al actualizar display name' });
  }
});

// Obtener descripción
router.get('/:uid/description', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ description: user.description });
  } catch (err) {
    console.error('Error al obtener descripción:', err);
    res.status(500).json({ error: 'Error al obtener descripción' });
  }
});

// Cambiar descripción
router.put('/:uid/description', async (req, res) => {
  try {
    const { description } = req.body;
    const user = await User.findOne({ uid: req.params.uid });

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    user.description = description;
    await user.save();

    res.json({ message: 'Descripción actualizada', description: user.description });
  } catch (err) {
    console.error('Error al actualizar descripción:', err);
    res.status(500).json({ error: 'Error al actualizar descripción' });
  }
});

// Eliminar descripción
router.delete('/:uid/description', async (req, res) => {
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
});

// Obtener photo URL
router.get('/:uid/photo-url', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ photoURL: user.photoURL || null });
  } catch (err) {
    console.error('Error al obtener photo URL:', err);
    res.status(500).json({ error: 'Error al obtener photo URL' });
  }
});

// Actualizar photo URL
router.put('/:uid/photo-url', async (req, res) => {
  try {
    const { photoURL } = req.body;
    const user = await User.findOne({ uid: req.params.uid });

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    user.photoURL = photoURL;
    user.updatedAt = new Date();
    await user.save();

    res.json({ message: 'Photo URL actualizada', user });
  } catch (err) {
    console.error('Error al actualizar photo URL:', err);
    res.status(500).json({ error: 'Error al actualizar photo URL' });
  }
});

// Eliminar photo URL
router.delete('/:uid/photo-url', async (req, res) => {
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
});

export default router;