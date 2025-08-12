import User from '../../models/User.js';

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
