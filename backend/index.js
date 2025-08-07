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
import connectDB from './database.js';

dotenv.config();

connectDB();

const app = express();
const server = createServer(app);

// Configurar CORS y Socket.IO con variables de entorno
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173'];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Endpoint para ver la salud de la API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Middlewares
app.use(cors({
  origin: allowedOrigins,
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