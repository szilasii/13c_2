import dbConfig from "../app/config"
import mysql from 'mysql2/promise'

export interface IFile {
    FileId?: string
    FileName?: string
    UploadTime?: string
    UserId?: number
}

export class File implements IFile {
    FileId?: string
    FileName?: string
    UploadTime?: string
    UserId?: number

    osszesadat : any = () => {
        return this
    } 
    
    constructor (file:any,UserId:number) {
            this.FileId = file.filename
            this.FileName = file.originalname
            this.UserId = UserId;
    }


    async loadDataFromDB(FileId : number) : Promise<boolean> {
        try {
            const conn = await mysql.createConnection(dbConfig)
            const[rows] : any =  await conn.execute('Select * from file where FileId = ?',[FileId])
            Object.assign(this,rows[0])
            return true
        }
        catch {
            return false
        }
    }
    async saveDataToDb() {
        
        try {
            const conn = await mysql.createConnection(dbConfig)
            const [rows] :any = await conn.execute('insert into file values(?,?,null,?)',[this.FileId,this.FileName,this.UserId])
        } catch (err) {
            console.log(err)
        }

    }
        
        
    
}