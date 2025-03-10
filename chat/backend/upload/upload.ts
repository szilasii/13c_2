import util from 'util'
import multer from 'multer'
import dotenv from 'dotenv'
import { randomUUID, UUID } from 'crypto'
dotenv.config()

const maxSize = parseInt(process.env.MAX_FILE_SIZE ?? "2097152")

const uploadDir= process.env.UPLOAD_DIR_NAME ?? "/uploads"
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,__dirname + uploadDir)
    },
    // filename: (req,file,cb) => {

    //     const uuid: UUID = randomUUID()
    //     file.uuid = uuid
    //     console.log(file.originalname)
    //     cb(null,uuid)
    // }
})

const uploadFile = multer({
    storage:storage,
    limits: {fileSize: maxSize}
}).single("file")

const uploadFiles = multer({
    storage:storage,
    limits: {fileSize: maxSize}
}).array("files",10)

export const uploadMiddleware = util.promisify(uploadFile)
export const uploadMiddlewareMultiple = util.promisify(uploadFiles)