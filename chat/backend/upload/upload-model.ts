import { Request,Response } from "express"
import { uploadMiddleware } from "./upload"
import * as fs from "fs"

export const upload = async (req:Request,res:any)=> {
    try {
        await uploadMiddleware(req,res)
        if (!req.file) {
            return res.status(400).send({message:"Töltsön fel fájlt!"})
        }
        res.status(200).send({message:`Sikeresen eltöltött: ${req.file.originalname}`})
    } catch (err) {
        res.status(500).send({message: "A feltöltés nem sikerült!",error:err})
    }

} 
export const download = (req:Request,res:any)=> {
    if (!req.params.name) {
       return res.status(400).send({messages:"Nem adott meg fájl nevet!"})
    }

    const fileName = req.params.name
    res.download(__dirname + process.env.UPLOAD_DIR_NAME + "/" +fileName, fileName,(err: any) => {
        if (err) {
            res.status(500).send({message: "hiba",error: err})
        }
    })
} 
export const getFileList = (req:Request,res:Response)=> {
    const dirPath = __dirname + process.env.UPLOAD_DIR_NAME
    fs.readdir(dirPath,(err, files) => {
        if (err) {
           return res.status(500).send({messages:"Hiba a fájlok keresésekor!"})
        }
        let info:any[] = []
        files.forEach((file) => {
            info.push({
                name: file,
                url: `http://localhost:3000/file/${file}`
            })
        })
        res.status(200).send({data: info})
    })

} 

