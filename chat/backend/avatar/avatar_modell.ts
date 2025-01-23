import { Request} from "express"
import { uploadMiddleware } from "./avatar"
import { File } from "../file/file"
import * as fs from "fs"
import { User } from "../user/user"
import dbConfig from "../app/config"
import mysql from 'mysql2/promise'
export const updateAvatar = async (req: Request, res: any) => {
    try {
        await uploadMiddleware(req, res)
        if (!res.decodedToken) {
            return res.status(401).send({ message: "A hozzáféréshez token szükséges!" })
        }
        if (!req.file) {
            return res.status(400).send({ message: "Töltsön fel fájlt!" })
        }

        const user = new User()
        user.loadDataFromDB(res.decodedToken.UserId)
        
        const file = new File(req.file, res.decodedToken.UserId)
        
        const filePath = __dirname + process.env.AVATAR_DIR_NAME + "/" + user.avatar;
        if (user.avatar!=null) {
            fs.unlinkSync(filePath)
        }
         
        if (await file.saveUserAvatarToDb()) {
            res.status(500).send({ message: "Az avatar módosítása nem sikerült!" })
            fs.unlinkSync(__dirname + process.env.AVATAR_DIR_NAME + "/" + req.file.filename)
        return
        }
       
        res.status(200).send({ message: `Sikeresen feltöltött: ${req.file.originalname}` })
        console.log(req.file.filename)
       
        
    } catch (err) {
        res.status(500).send({ message: "A feltöltés nem sikerült!", error: err })
    }

}
export const deleteAvatar = async (req: Request, res: any) => {
    try {
        
        if (!res.decodedToken) {
            return res.status(401).send({ message: "A hozzáféréshez token szükséges!" })
        }
        const user = new User()
        user.loadDataFromDB(res.decodedToken.UserId)
        if (user.avatar === null || undefined) {
            res.status(200).send({ message: `Nem volt a felhasználónak avatar beállítva!` })
            return
        }
      
        const conn = await mysql.createConnection(dbConfig)
        try {
            conn.beginTransaction()
            const rows =await conn.execute('Update users set avatar = null where UserId = ?', [res.decodedToken.UserId])   
            const filePath = __dirname + process.env.AVATAR_DIR_NAME + "/" + user.avatar;
            fs.unlinkSync(filePath) 
            conn.commit()
        }
        catch(err) {
            conn.rollback()
            res.status(500).send({ message: "Hiba a fájl törlésekor, a törlés nem sikerült" })  
            return
        }
        res.status(200).send({ message: `Avatar sikeresen törölve` })
       
    } catch (err) {
        res.status(500).send({ message: "A törlés nem sikerült!", error: err })
    }

}