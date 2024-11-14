import {Router} from 'express'
import * as user from './user-model'
const router: Router = Router()

router.get('/user/:UserId/',user.getUserFromId)
router.get('/user',user.getUsers)
router.post('/user',user.addUser)
router.put('/user/:UserId',user.updateUser)
router.delete('/user/:UserId',user.deleteUser)

export default router