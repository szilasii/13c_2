import dbConfig from "../app/config"
import mysql from 'mysql2/promise'

export interface IMessage {
    MessageId?: number
    ChatId?: number
    SenderId?: number
    SentTime?: Date
}

export class Message implements IMessage {
    MessageId?: number
    ChatId?: number
    SenderId?: number
    SentTime?: Date

    async loadDataFromDB(MessageId: number): Promise<boolean> {
        try {
            const conn = await mysql.createConnection(dbConfig)
            const [rows]: any = await conn.execute('SELECT MessageId, ChatId, SenderId, SentTime FROM messages WHERE MessageId = ?', [MessageId])
            Object.assign(this, rows[0])
            return true
        } catch {
            return false
        }
    }

    static async validMessage(SenderId: number, ChatId: number): Promise<number> {
        try {
            const sql: string = 'SELECT MessageId FROM messages WHERE SenderId = ? AND ChatId = ?'
            const conn = await mysql.createConnection(dbConfig)
            const [rows]: any = await conn.execute(sql, [SenderId, ChatId])
            return rows[0]?.MessageId || 0
        } catch (err) {
            console.log(err)
            return 0
        }
    }
}