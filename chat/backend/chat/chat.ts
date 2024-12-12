import dbConfig from "../app/config"
import mysql from 'mysql2/promise'

export interface IChat {
    ChatId?: number
    ChatName?: string
}

export class Chat implements IChat {
    ChatId?: number
    ChatName?: string

    async loadDataFromDB(ChatId: number): Promise<boolean> {
        try {
            const conn = await mysql.createConnection(dbConfig)
            const [rows]: any = await conn.execute('SELECT ChatId, ChatName FROM chats WHERE ChatId = ?', [ChatId])
            Object.assign(this, rows[0])
            return true
        } catch {
            return false
        }
    }
}
