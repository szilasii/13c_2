import util from 'util'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config()

const maxSize = parseInt(process.env.MAX_FILE_SIZE ?? "2097152")
const uploadDir= process.env.UPLOAD_DIR_NAME ?? "/uploads"

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,__dirname + uploadDir)
    },
    filename: (req,file,cb) => {
        console.log(file.originalname)
        cb(null,file.originalname)
    }
})

const uploadFile = multer({
    storage:storage,
    limits: {fileSize: maxSize}
}).single("file")

export const uploadMiddleware = util.promisify(uploadFile)