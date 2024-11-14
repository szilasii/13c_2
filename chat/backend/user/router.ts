import {Router} from 'express'
import * as user from './user-model'
const router: Router = Router()

router.get('/user/:id',user.getUserFromId)
router.get('/user',user.getUsers)

export default router