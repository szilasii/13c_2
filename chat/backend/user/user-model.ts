import { Request, Response } from "express";
import mysql from 'mysql2'
import dbConfig from '../app/config'
import { IUser } from './user'

export function getUserFromId(req:Request, res : Response) {
    if (!req.params.UserId)
    {
        res.status(401).send({error: "Hiányzó felhasználó azonosító"})
        return
    }

    let conn = mysql.createConnection(dbConfig)
    conn.connect((err)=>{
        if (err) {
            res.status(500).send({error: "Nem sikerült csatlakozni az adatbázishoz!"})
            return
        }
        console.log("Sikeres csatlakozás")
    })
    conn.query('select name,email,phoneNumber from users where userid = ?',[req.params.UserId],(err,result:any) =>{
        if (err) {
            res.status(500).send({error: "Hiba az adatok lekérdezése során!"})
            return
        }
        const user : IUser = result[0]
       if (!user.Name) {
        res.status(404).send({error: "Nem létező felhasználó"})
        return
       }
        res.status(200).send(user)
    })
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
