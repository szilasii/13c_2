import dbConfig from "../app/config"
import mysql from 'mysql2/promise'

export interface IChatMember {
    ChatId?: number
    UserId?: number
}

export class ChatMember implements IChatMember {
    ChatId?: number
    UserId?: number

    async loadDataFromDB(ChatId: number, UserId: number): Promise<boolean> {
        try {
            const conn = await mysql.createConnection(dbConfig)
            const [rows]: any = await conn.execute('SELECT ChatId, UserId FROM chatmembers WHERE ChatId = ? AND UserId = ?', [ChatId, UserId])
            Object.assign(this, rows[0])
            return true
        } catch {
            return false
        }
    }

    static async validChatMember(ChatId: number, UserId: number): Promise<boolean> {
        try {
            const sql: string = 'SELECT COUNT(*) as count FROM chatmembers WHERE ChatId = ? AND UserId = ?'
            const conn = await mysql.createConnection(dbConfig)
            const [rows]: any = await conn.execute(sql, [ChatId, UserId])
            return rows[0].count > 0
        } catch (err) {
            console.log(err)
            return false
        }
    }
}
