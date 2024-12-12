import { Router } from 'express';
import * as chat from './chat-model';
import auth from '../auth/auth';
const router: Router = Router();

router.get('/chat/:ChatId/', chat.getChatFromId);
router.get('/chat', chat.getChats);
router.post('/chat', chat.addChat);
router.put('/chat', auth, chat.updateChat);
router.delete('/chat', auth, chat.deleteChat);

export default router;