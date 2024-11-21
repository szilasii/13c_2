import {Router} from 'express'

import signIn from './login_model'
const router: Router = Router()

router.post('/login',signIn)


export default router