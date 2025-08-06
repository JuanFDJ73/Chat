import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';
import SocketHandler from './websocket/socketHandler.js';
import userRoutes from './routes/UserRoutes.js';
import conversationRoutes from './routes/ConversationRoutes.js';
import MessageRoutes from './routes/MessageRoutes.js';
import './database.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5000'], // Agregar puertos del frontend
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middlewares
app.use(cors({
  origin: ['http://localhost:5000'],
  credentials: true
}));
app.use(logger('dev'));
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/messages', MessageRoutes);
app.use('/api/conversations', conversationRoutes);
app.get('/', (req, res) => res.send('Backend funcionando'));

// Sockets
SocketHandler(io);

// Puerto
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});