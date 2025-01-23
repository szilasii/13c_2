import { Request, Response } from "express"
import { uploadMiddleware, uploadMiddlewareMultiple } from "./upload"
import { File } from "../file/file"
import * as fs from "fs"

export const upload = async (req: Request, res: any) => {
    try {
        await uploadMiddleware(req, res)
        if (!res.decodedToken) {
            return res.status(401).send({ message: "A hozzáféréshez token szükséges!" })
        }
        if (!req.file) {
            return res.status(400).send({ message: "Töltsön fel fájlt!" })
        }

        const file = new File(req.file, res.decodedToken.UserId)
        file.saveDataToDb()

        res.status(200).send({ message: `Sikeresen eltöltött: ${req.file.originalname}` })
        console.log(req.file.filename)
    } catch (err) {
        res.status(500).send({ message: "A feltöltés nem sikerült!", error: err })
    }

}

export const uploads = async (req: Request, res: any) => {
    try {
        await uploadMiddlewareMultiple(req, res)
        if (!res.decodedToken) {
            return res.status(401).send({ message: "A hozzáféréshez token szükséges!" })
        }
        if (!req.files) {
            return res.status(400).send({ message: "Töltsön fel fájlt!" })
        }

        const files:Express.Multer.File[] = req.files as Express.Multer.File[]
        const fileUploadList : string[] = []
        
        files.map((file:any) => {
            const saveFile = new File(file, res.decodedToken.UserId)
            saveFile.saveDataToDb()  
            fileUploadList.push(file.originalname)
        })    
        res.status(200).send({ message: `Sikeresen feltöltött: ${JSON.stringify(fileUploadList)}` })
    } catch (err) {
        res.status(500).send({ message: "A feltöltés nem sikerült!", error: err })
    }

}


export const download = (req: Request, res: any) => {
    if (!req.params.name) {
        return res.status(400).send({ messages: "Nem adott meg fájl nevet!" })
    }

    const fileName = req.params.name
    res.download(__dirname + process.env.UPLOAD_DIR_NAME + "/a" + fileName, fileName, (err: any) => {
        if (err) {
            res.status(500).send({ message: "hiba", error: err })
        }
    })
}
export const getFileList = (req: Request, res: any) => {
    const dirPath = __dirname + process.env.UPLOAD_DIR_NAME
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return res.status(500).send({ messages: "Hiba a fájlok keresésekor!" })
        }
        let info: any[] = []
        files.forEach((file) => {
            info.push({
                name: file,
                url: `http://localhost:3000/file/${file}`
            })
        })
        res.status(200).send({ data: info })
    })

}

