import {Router} from 'express'
import * as user from './user-model'
const router: Router = Router()

router.get('/user',user.getUser)

export default router