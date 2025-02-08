import express from 'express';
import {getPresence, getPresenceById, savePresence, deletePresence} from '../Controllers/PresenceController.js';


const router = express.Router();

router.get('/Presences', getPresence);
router.get('/Presence/:id', getPresenceById);
router.post('/Presence', savePresence);
router.delete('/Presences/:id', deletePresence);

export default router;