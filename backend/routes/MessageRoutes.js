import express from 'express';
import { getMessagesByConversation, getMessageById } from './MessageRoutes/GetMessage.routes.js';
import { createMessage, markMessageAsRead } from './MessageRoutes/PostMessage.routes.js';
import { deleteMessage, deleteMessagePermanently } from './MessageRoutes/DeleteMessage.routes.js';

const router = express.Router();

// GET - Obtener mensajes de una conversación
router.get('/:conversationId', getMessagesByConversation);

// GET - Obtener un mensaje específico
router.get('/single/:messageId', getMessageById);

// POST - Crear nuevo mensaje
router.post('/', createMessage);

// POST - Marcar mensaje como leído
router.post('/read/:messageId', markMessageAsRead);

// DELETE - Eliminar mensaje (soft delete)
router.delete('/:messageId', deleteMessage);

// DELETE - Eliminar mensaje permanentemente
router.delete('/permanent/:messageId', deleteMessagePermanently);

export default router;