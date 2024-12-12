import dbConfig from "../app/config"
import mysql from 'mysql2/promise'

export interface IFriendRequest {
    SenderId: number;
    RecieverId: number;
}

export class FriendRequest implements IFriendRequest {
    SenderId: number;
    RecieverId: number;

    constructor(SenderId: number, RecieverId: number) {
        this.SenderId = SenderId;
        this.RecieverId = RecieverId;
    }

    async saveToDB(): Promise<boolean> {
        try {
            const conn = await mysql.createConnection(dbConfig);
            const sql = 'INSERT INTO friendrequests (SenderId, RecieverId) VALUES (?, ?)';
            await conn.execute(sql, [this.SenderId, this.RecieverId]);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    static async getRequestsForUser(UserId: number): Promise<IFriendRequest[]> {
        try {
            const conn = await mysql.createConnection(dbConfig);
            const sql = 'SELECT SenderId, RecieverId FROM friendrequests WHERE RecieverId = ?';
            const [rows]: any = await conn.execute(sql, [UserId]);
            return rows;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    static async deleteRequest(SenderId: number, RecieverId: number): Promise<boolean> {
        try {
            const conn = await mysql.createConnection(dbConfig);
            const sql = 'DELETE FROM friendrequests WHERE SenderId = ? AND RecieverId = ?';
            await conn.execute(sql, [SenderId, RecieverId]);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}