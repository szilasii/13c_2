import {Router} from 'express'
import {upload,download,getFileList, uploads} from './upload-model'
import auth from '../auth/auth'
const router: Router = Router()

router.get('/file/:name', download)
router.get('/files',getFileList)
router.post('/upload', auth,upload)
router.post('/upload/files',auth,uploads)
// router.put('/user',auth,user.updateUser)
// router.delete('/user',auth,user.deleteUser)

export default router