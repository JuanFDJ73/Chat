import express from 'express';
import { createConversation } from './ConversationRoutes/PostConversation.routes.js';
import { getConversationsByUser } from './ConversationRoutes/GetConversation.routes.js';
import { deleteConversation } from './ConversationRoutes/DeleteConversation.routes.js';

const router = express.Router();

// POST - Crear nueva conversación
router.post('/', createConversation);

// GET - Obtener conversaciones de un usuario
router.get('/:uid', getConversationsByUser);

// DELETE - Eliminar conversación
router.delete('/:id', deleteConversation);

export default router;
