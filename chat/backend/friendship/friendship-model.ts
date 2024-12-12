import { Request, Response } from "express";
import mysqlP from 'mysql2/promise';
import dbConfig from '../app/config';

export async function getFriendships(req: Request, res: Response) {
    if (!req.params.UserId) {
        res.status(401).send({ error: "Hiányzó felhasználó azonosító" });
        return;
    }
    const userId = parseInt(req.params.UserId as string);
    try {
        const conn = await mysqlP.createConnection(dbConfig);
        const [rows]: any = await conn.execute('SELECT * FROM friendships WHERE UserId = ? OR FriendId = ?', [userId, userId]);
        res.status(200).send(rows);
    } catch (err: any) {
        res.status(500).send({ error: "Hiba az adatok lekérdezése során!" });
    }
}

export async function addFriendship(req: Request, res: Response) {
    const { UserId, FriendId } = req.body;
    if (!UserId || !FriendId) {
        res.status(400).send({ error: "Hiányzó paraméterek" });
        return;
    }
    try {
        const conn = await mysqlP.createConnection(dbConfig);
        await conn.execute('INSERT INTO friendships (UserId, FriendId) VALUES (?, ?)', [UserId, FriendId]);
        res.status(201).send({ message: "Sikeres adatrögzítés" });
    } catch (err: any) {
        res.status(500).send({ error: "Hiba az adatrögzítéskor" });
    }
}

export async function deleteFriendship(req: Request, res: Response) {
    const { UserId, FriendId } = req.body;
    if (!UserId || !FriendId) {
        res.status(400).send({ error: "Hiányzó paraméterek" });
        return;
    }
    try {
        const conn = await mysqlP.createConnection(dbConfig);
        const [rows]: any = await conn.execute('DELETE FROM friendships WHERE UserId = ? AND FriendId = ?', [UserId, FriendId]);
        if (rows.affectedRows > 0) {
            res.status(200).send({ message: "Sikeres adattörlés!" });
        } else {
            res.status(404).send({ error: "Nem lett törölve adat!" });
        }
    } catch (err: any) {
        res.status(500).send({ error: "Hiba a törléskor" });
    }
}
