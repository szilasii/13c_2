import { Request, Response } from "express";
import mysql from 'mysql2'
import mysqlP from 'mysql2/promise'
import dbConfig from '../app/config'
import { IUser,User } from './user'

export function getUserFromId(req:Request, res : Response) {
    if (!req.params.UserId)
    {
        res.status(401).send({error: "Hiányzó felhasználó azonosító"})
        return
    }
    const user : User = new User()
    user.setUser(parseInt(req.params.UserId as string))
      // let conn = mysql.createConnection(dbConfig)
    // conn.connect((err)=>{
    //     if (err) {
    //         res.status(500).send({error: "Nem sikerült csatlakozni az adatbázishoz!"})
    //         return
    //     }
    //     console.log("Sikeres csatlakozás")
    // })
    // conn.query('select name,email,phoneNumber from users where userid = ?',[req.params.UserId],(err,result:any) =>{
    //     if (err) {
    //         res.status(500).send({error: "Hiba az adatok lekérdezése során!"})
    //         return
    //     }
    //     const user : IUser = result[0]
    //    if (!user.Name) {
    //     res.status(404).send({error: "Nem létező felhasználó"})
    //     return
    //    }
    //     res.status(200).send(user)
    // })
}
    export function getUsers(req:Request, res : Response) {
        let conn = mysql.createConnection(dbConfig)
        conn.connect((err)=>{
            if (err) {
                res.status(500).send({error: "Nem sikerült csatlakozni az adatbázishoz!"})
                return
            }
        })
        conn.query('select name,email,phoneNumber from users',(err,result:any) =>{
            if (err) {
                res.status(500).send({error: "Hiba az adatok lekérdezése során!"})
                return
            }
            const users : IUser[] = result
           if (users.length < 1) {
            res.status(404).send({error: "Nem létező felhasználó"})
            return
           }
            res.status(200).send(users)
        })    
    }
    export async function addUser(req:Request, res : Response) {
        const user : User = req.body as User
        try {
            const conn = await mysqlP.createConnection(dbConfig)
            const [rows] :any = await conn.execute('insert into users values(null,?,?,?,?)',[user.Name,user.Email,user.PhoneNumber,user.PassWord])
            user.UserId=rows.insertId
            user.PassWord=undefined
            res.status(201).send({message:"Sikeres adatrögzítés",data:user as IUser})
        }
        catch (err:any) {
            switch (err.errno) {
                case 1062 : res.status(500).send({error:{message:"Már létező email cím"}})
                case 1045 : res.status(500).send({error:{message:"Hiba a csatlakozáskor nem megfelelő adatbázis jelszó"}})
                default:  res.status(500).send({error:{message:"Hiba az adatrögzítéskor"}})
            }
            return
        }
       
    }
    export async function updateUser(req:Request, res : Response) {
        if (!req.params.UserId) {
            res.status(401).send({error:"Hiányzó patraméter"})
            return
        }
        const user : User = req.body as User
        try {
            const conn = await mysqlP.createConnection(dbConfig)
            const [rows] :any = await conn.execute('Update users set Name =?,Email=?, PhoneNumber=? where UserId =?',[user.Name,user.Email,user.PhoneNumber,req.params.UserId])
            user.PassWord=undefined
            res.status(201).send({message:"Sikeres adatrögzítés",data:user as IUser})
        }
        catch (err:any) {
            console.log(err)
            switch (err.errno) {
                case 1062 : res.status(500).send({error:{message:"Már létező email cím!"}})
                case 1045 : res.status(500).send({error:{message:"Hiba a csatlakozáskor nem megfelelő adatbázis jelszó!"}})
                default:  res.status(304).send({error:{message:"Hiba a módosításkor!"}})
            }
            return
        }
    }
    export async function deleteUser(req:Request, res : Response) {
        if (!req.params.UserId) {
            res.status(401).send({error:"Hiányzó patraméter"})
            return
        }
     
        try {
            const conn = await mysqlP.createConnection(dbConfig)
            const [rows] :any = await conn.execute('delete from users where UserId= ? ',[req.params.UserId])
            console.log(rows)
            if (rows.affectedRows > 0) {
                //res.status(204)
                res.status(200).send({message:"Sikeres adattörlés!"})  
                return  
            }
            res.status(404).send({error:"Nem lett törölve adat!"})
        }
        catch (err:any) {
            console.log(err)
            switch (err.errno) {
                case 1045 : res.status(500).send({error:{message:"Hiba a csatlakozáskor nem megfelelő adatbázis jelszó"}})
                default:  res.status(500).send({error:{message:"Hiba a törléskor"}})
            }
            return
        }
    }
  
