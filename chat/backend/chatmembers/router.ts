import {Router} from 'express'
import * as chatmember from './chatmember-model'
import auth from '../auth/auth'
const router: Router = Router()

router.get('/chatmember/:ChatId/:UserId', chatmember.getChatMemberFromId)
router.get('/chatmembers', chatmember.getChatMembers)
router.post('/chatmember', chatmember.addChatMember)
router.put('/chatmember', auth, chatmember.updateChatMember)
router.delete('/chatmember', auth, chatmember.deleteChatMember)

export default router