import {Router} from 'express'
import {upload,download,getFileList} from './upload-model'
import auth from '../auth/auth'
const router: Router = Router()

router.get('/file/:name', download)
router.get('/files',getFileList)
router.post('/upload', upload)
// router.put('/user',auth,user.updateUser)
// router.delete('/user',auth,user.deleteUser)

export default router