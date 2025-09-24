import express from 'express';
import { 
  getAllUsers, 
  getUserByUid, 
  getUserByEmail, 
  getUserByDisplayName,
  searchUser,
  getConversationsWithNames, 
  getDisplayName, 
  getDescription, 
  getPhotoURL 
} from './UserRoutes/GetUser.routes.js';
import { 
  registerUser, 
  blockUser, 
  unblockUser, 
  addContact, 
  updateContactNickname, 
  updateDisplayName, 
  updateDescription, 
  updatePhotoURL 
} from './UserRoutes/PostUser.routes.js';
import { 
  deleteDescription, 
  deletePhotoURL, 
  deleteContact, 
  deleteContactCompletely,
  deleteUser 
} from './UserRoutes/DeleteUser.routes.js';

const router = express.Router();

// GET Routes
router.get('/', getAllUsers);
router.get('/:uid', getUserByUid);
router.get('/email/:email', getUserByEmail);
router.get('/displayname/:displayName', getUserByDisplayName);
router.get('/search/:searchTerm', searchUser);
router.get('/:uid/conversations-with-names', getConversationsWithNames);
router.get('/:uid/display-name', getDisplayName);
router.get('/:uid/description', getDescription);
router.get('/:uid/photo-url', getPhotoURL);

// POST Routes
router.post('/register', registerUser);
router.post('/:uid/block/:targetUid', blockUser);
router.post('/:uid/unblock/:targetUid', unblockUser);
router.post('/:uid/contacts', addContact);

// PUT Routes
router.put('/:uid/contacts/:contactUid', updateContactNickname);
router.put('/:uid/display-name', updateDisplayName);
router.put('/:uid/description', updateDescription);
router.put('/:uid/photo-url', updatePhotoURL);

// DELETE Routes
router.delete('/:uid/description', deleteDescription);
router.delete('/:uid/photo-url', deletePhotoURL);
router.delete('/:uid/contacts/:contactUid', deleteContact);
router.delete('/:uid/contacts/:contactUid/completely', deleteContactCompletely);
router.delete('/:uid', deleteUser);

export default router;