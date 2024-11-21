import {Router} from 'express'
import { createChat, deleteChat, getChats, getChatsFromId, updateChat } from './chat-model'
import auth from '../auth/auth'
const router: Router = Router()

router.get('/chats/:ChatId',auth,getChatsFromId)
router.get('/chats',auth,getChats)
router.post('/chats',auth,createChat)
router.put('/chats/:ChatId',auth,updateChat)
router.delete('/chats/:ChatId',auth,deleteChat)

export default router