import mongoose from 'mongoose';

function arrayLimit(val) {
  return val.length >= 2;
}

const ConversationSchema = new mongoose.Schema({
  participants: { // IDs de los usuarios participantes
    type: [Number],
    validate: [arrayLimit, '{PATH} debe tener al menos 2 participantes']
  }, 
  lastMessage: {
    text: String,
    sender: Number,
    timestamp: Date
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

const Conversation = mongoose.model('Conversation', ConversationSchema);
export default Conversation;
