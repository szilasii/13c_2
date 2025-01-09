import dbConfig from "../app/config"
import mysql from 'mysql2/promise'

export interface IUser {
    UserId?: number
    Name?: string
    Email?: string
    PhoneNumber?: string
    PassWord?: string
    token?: string
    avatar?: string
}

export class User implements IUser {
    UserId?: number
    Name?: string
    Email?: string
    PhoneNumber?: string
    PassWord?: string
    token?:string
    avatar?:string

    // constructor (UserId:number | null,
    //      Name:string,
    //      Email:string,
    //      PhoneNumber:string | null,
    //      PassWord:string | null)
    //     {
    //         this.UserId = UserId;
    //         this.Name = Name;
    //         this.Email = Email;
    //         this.PhoneNumber = PhoneNumber;
    //         this.PassWord = PassWord;
    //     }  
    nagybetu : any = () => {
        return this.Name?.toLocaleLowerCase()
    }
    osszesadat : any = () => {
        return this
    } 
    
    async loadDataFromDB(UserId : number) : Promise<boolean> {
        try {
            const conn = await mysql.createConnection(dbConfig)
            const[rows] : any =  await conn.execute('Select UserId,Name,Email,PhoneNumber,avatar from users where UserId = ?',[UserId])
            Object.assign(this,rows[0])
            return true
        }
        catch {
            return false
        }
    }
    static async validUser (Email:string,PassWord:string) : Promise<number> {
        try{
            const sql : string = 'select login(?,?) as UserId'
            const conn = await mysql.createConnection(dbConfig)
            const[rows] : any = await conn.execute(sql,[Email,PassWord])  
            return rows[0].UserId
        } catch (err) {
            console.log(err)
            return 0
        }
    }
}






