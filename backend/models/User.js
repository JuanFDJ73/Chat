import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    default: null // Si es null, usa el displayName del contacto
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
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
  description: {
    type: String,
    default: null
  },
  photoURL: String,
  contacts: [ContactSchema], // Lista de contactos con nicknames
  blockedUsers: {
    type: [String],
    index: true
  },
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
