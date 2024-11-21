
import { Request, Response } from "express";
import { User } from "../user/user";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export default async function signIn(req:Request,res:Response):Promise<any> {

    const user: User = new User()
    Object.assign(user,req.body)
    if (!user.Email || !user.PassWord)
    {
        res.status(400).send({error:{message:"Hiányzó email vagy jelszó!"}})
        return
    }

    const UserId = await User.validUser(user.Email,user.PassWord)
    
    if(!UserId) {
        res.status(401).send({error:"Hibás felhasználónév vagy jelszó!"})
    }
    
    if (!await user.loadDataFromDB(UserId))
    {
        res.status(401).send({error:"A bejelentkezés nem sikerült"})
        return 
    }
    user.PassWord = undefined

    const payload = {UserId:user.UserId}
    const {JWT_STRING} = process.env
    if (!JWT_STRING) {
        return res.status(401).send({"status":401,"error":"Hiba történ a regisztrációs token aláírásakor"});
    }
    
    user.token = jwt.sign(payload, JWT_STRING, { expiresIn: "2h" })
    res.status(200).send({success:"Sikeres bejelentkezés!", user:user})

}