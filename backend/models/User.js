import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  uid: {
    type: Number, // ID numérico único asignado al registrarse
    unique: true,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  photoURL: String,
  blockedUsers: {
    type: [Number],
    index: true
  }, // Lista de IDs de usuarios bloqueados
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);
export default User;
