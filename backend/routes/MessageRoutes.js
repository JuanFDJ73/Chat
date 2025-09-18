import express from 'express';
import { getMessagesByConversation, getMessageById } from './MessageRoutes/GetMessage.routes.js';
import { createMessage, markMessageAsRead } from './MessageRoutes/PostMessage.routes.js';
import { deleteMessageForUser, deleteMessageForAll } from './MessageRoutes/DeleteMessage.routes.js';

const router = express.Router();

// GET - Obtener mensajes de una conversación
router.get('/:conversationId', getMessagesByConversation);

// GET - Obtener un mensaje específico
router.get('/single/:messageId', getMessageById);

// POST - Crear nuevo mensaje
router.post('/', createMessage);

// POST - Marcar mensaje como leído
router.post('/read/:messageId', markMessageAsRead);

// PUT - Eliminar mensaje para un usuario específico
router.put('/:messageId/delete-for-user', deleteMessageForUser);

// PUT - Eliminar mensaje para todos los participantes
router.put('/:messageId/delete-for-all', deleteMessageForAll);

export default router;