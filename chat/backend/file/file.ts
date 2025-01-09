import dbConfig from "../app/config"
import mysql from 'mysql2/promise'
import * as fs from "fs"

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

    osszesadat: any = () => {
        return this
    }

    constructor(file: any, UserId: number) {
        this.FileId = file.filename
        this.FileName = file.originalname
        this.UserId = UserId;
    }


    async loadDataFromDB(FileId: number): Promise<boolean> {
        try {
            const conn = await mysql.createConnection(dbConfig)
            const [rows]: any = await conn.execute('Select * from file where FileId = ?', [FileId])
            Object.assign(this, rows[0])
            return true
        }
        catch {
            return false
        }
    }
    async saveDataToDb() {

        try {
            const conn = await mysql.createConnection(dbConfig)
            const [rows]: any = await conn.execute('insert into file values(?,?,null,?)', [this.FileId, this.FileName, this.UserId])
        } catch (err) {
            console.log(err)
        }

    }

    async saveUserAvatarToDb() {
        const conn = await mysql.createConnection(dbConfig)
        try {
            const [rows]: any = await conn.execute('Update users set avatar = ? where UserId = ?', [this.FileId, this.UserId])
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

}
export const deleteFile = (fname: string) => {
    const filePath = __dirname + process.env.UPLOAD_DIR_NAME + "/" + fname;
    try {
        fs.unlinkSync(filePath)
        return true
    } catch (err) {
        return false
    }
}

export const deleteFileFromDatabaseAndStore = (fileName:string,UserId:number) => {
    try{
        const conn = mysql.createConnection(dbConfig)
       
    } catch {

    }
    
    
}