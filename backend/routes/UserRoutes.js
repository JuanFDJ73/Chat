import express from 'express';
import User from '../models/User.js';

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

export default router;