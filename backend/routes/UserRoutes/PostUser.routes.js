import User from '../../models/User.js';

/**
 * Registrar un nuevo usuario (por ejemplo, al hacer login con Google por primera vez)
 */
export const registerUser = async (req, res) => {
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
};

/**
 * Bloquear a otro usuario
 */
export const blockUser = async (req, res) => {
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
};

/**
 * Desbloquear a un usuario
 */
export const unblockUser = async (req, res) => {
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
};

/**
 * Agregar contacto
 */
export const addContact = async (req, res) => {
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
};

/**
 * Actualizar nickname de contacto
 */
export const updateContactNickname = async (req, res) => {
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
};

/**
 * Cambiar displayName
 */
export const updateDisplayName = async (req, res) => {
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
};

/**
 * Cambiar descripción
 */
export const updateDescription = async (req, res) => {
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
};

/**
 * Actualizar photo URL
 */
export const updatePhotoURL = async (req, res) => {
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
};
