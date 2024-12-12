import {Router} from 'express'
import * as friendrequest from './friendshiprequest-model'
import auth from '../auth/auth'
const router: Router = Router()

router.get('/friendrequest/:UserId',auth,friendrequest.getFriendRequests)
router.get('/friendrequest',auth,friendrequest.getFriendRequests)
router.post('/friendrequest',auth,friendrequest.sendFriendRequest)
router.put('/friendrequest',auth,friendrequest.acceptFriendRequest)
router.delete('/friendrequest',auth,friendrequest.rejectFriendRequest)

export default router