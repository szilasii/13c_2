import { Router } from 'express';
import * as friendship from './friendship-model';
import auth from '../auth/auth';
const router: Router = Router();

router.get('/friendship/:UserId', friendship.getFriendships);
router.post('/friendship', auth, friendship.addFriendship);
router.delete('/friendship', auth, friendship.deleteFriendship);

export default router;
