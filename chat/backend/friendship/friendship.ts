import dbConfig from "../app/config"
import mysql from 'mysql2/promise'

export interface IFriendship {
    UserId?: number
    FriendId?: number
}

export class Friendship implements IFriendship {
    UserId?: number
    FriendId?: number

    async loadDataFromDB(UserId: number, FriendId: number): Promise<boolean> {
        try {
            const conn = await mysql.createConnection(dbConfig)
            const [rows]: any = await conn.execute('SELECT UserId, FriendId FROM friendships WHERE UserId = ? AND FriendId = ?', [UserId, FriendId])
            Object.assign(this, rows[0])
            return true
        } catch {
            return false
        }
    }

    static async addFriend(UserId: number, FriendId: number): Promise<boolean> {
        try {
            const sql: string = 'INSERT INTO friendships (UserId, FriendId) VALUES (?, ?)'
            const conn = await mysql.createConnection(dbConfig)
            await conn.execute(sql, [UserId, FriendId])
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    static async removeFriend(UserId: number, FriendId: number): Promise<boolean> {
        try {
            const sql: string = 'DELETE FROM friendships WHERE UserId = ? AND FriendId = ?'
            const conn = await mysql.createConnection(dbConfig)
            await conn.execute(sql, [UserId, FriendId])
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
}
