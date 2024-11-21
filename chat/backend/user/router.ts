import {Router} from 'express'
import * as user from './user-model'
import auth from '../auth/auth'
const router: Router = Router()

router.get('/user/:UserId/',user.getUserFromId)
router.get('/user',user.getUsers)
router.post('/user',user.addUser)
router.put('/user',auth,user.updateUser)
router.delete('/user',auth,user.deleteUser)

export default router