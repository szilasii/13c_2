import {Router} from 'express'
import * as message from './message-model'
import auth from '../auth/auth'
const router: Router = Router()

router.get('/message/:MessageId/', message.getMessageFromId)
router.get('/message', message.getMessages)
router.post('/message', message.addMessage)
router.put('/message', auth, message.updateMessage)
router.delete('/message', auth, message.deleteMessage)

export default router