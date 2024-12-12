import { Request, Response } from "express";
import mysqlP from 'mysql2/promise'
import dbConfig from '../app/config'

export async function sendFriendRequest(req: Request, res: Response) {
    const { SenderId, RecieverId } = req.body;

    if (!SenderId || !RecieverId) {
        res.status(400).send({ error: "Hiányzó paraméterek" });
        return;
    }

    try {
        const conn = await mysqlP.createConnection(dbConfig);
        await conn.execute('INSERT INTO friendrequests (SenderId, RecieverId) VALUES (?, ?)', [SenderId, RecieverId]);
        res.status(201).send({ message: "Sikeres barátkérés" });
    } catch (err: any) {
        console.log(err);
        res.status(500).send({ error: "Hiba a barátkérés küldésekor" });
    }
}

export async function getFriendRequests(req: Request, res: Response) {
    const { UserId } = req.params;

    if (!UserId) {
        res.status(400).send({ error: "Hiányzó felhasználó azonosító" });
        return;
    }

    try {
        const conn = await mysqlP.createConnection(dbConfig);
        const [rows]: any = await conn.execute('SELECT * FROM friendrequests WHERE RecieverId = ?', [UserId]);
        res.status(200).send(rows);
    } catch (err: any) {
        console.log(err);
        res.status(500).send({ error: "Hiba a barátkérések lekérdezésekor" });
    }
}

export async function acceptFriendRequest(req: Request, res: Response) {
    const { SenderId, RecieverId } = req.body;

    if (!SenderId || !RecieverId) {
        res.status(400).send({ error: "Hiányzó paraméterek" });
        return;
    }

    try {
        const conn = await mysqlP.createConnection(dbConfig);
        await conn.execute('DELETE FROM friendrequests WHERE SenderId = ? AND RecieverId = ?', [SenderId, RecieverId]);
        res.status(200).send({ message: "Barátkérés elfogadva" });
    } catch (err: any) {
        console.log(err);
        res.status(500).send({ error: "Hiba a barátkérés elfogadásakor" });
    }
}

export async function rejectFriendRequest(req: Request, res: Response) {
    const { SenderId, RecieverId } = req.body;

    if (!SenderId || !RecieverId) {
        res.status(400).send({ error: "Hiányzó paraméterek" });
        return;
    }

    try {
        const conn = await mysqlP.createConnection(dbConfig);
        await conn.execute('DELETE FROM friendrequests WHERE SenderId = ? AND RecieverId = ?', [SenderId, RecieverId]);
        res.status(200).send({ message: "Barátkérés elutasítva" });
    } catch (err: any) {
        console.log(err);
        res.status(500).send({ error: "Hiba a barátkérés elutasításakor" });
    }
}