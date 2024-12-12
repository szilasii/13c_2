import { Request, Response } from "express";
import mysql from 'mysql2';
import mysqlP from 'mysql2/promise';
import dbConfig from '../app/config';

export async function getMessageFromId(req: Request, res: Response) {
    if (!req.params.MessageId) {
        res.status(401).send({ error: "Hiányzó üzenet azonosító" });
        return;
    }
    const conn = await mysqlP.createConnection(dbConfig);
    const [rows]: any = await conn.execute('SELECT * FROM messages WHERE MessageId = ?', [req.params.MessageId]);
    const message = rows[0];

    if (!message) {
        res.status(404).send({ error: "Nem létező üzenet" });
        return;
    }
    res.send(message);
}

export async function getMessages(req: Request, res: Response) {
    const conn = await mysqlP.createConnection(dbConfig);
    const [rows]: any = await conn.execute('SELECT * FROM messages');
    const messages = rows;

    if (messages.length < 1) {
        res.status(404).send({ error: "Nem létező üzenet" });
        return;
    }
    res.status(200).send(messages);
}

export async function addMessage(req: Request, res: Response) {
    const { ChatId, SenderId, SentTime } = req.body;
    try {
        const conn = await mysqlP.createConnection(dbConfig);
        const [rows]: any = await conn.execute('INSERT INTO messages (ChatId, SenderId, SentTime) VALUES (?, ?, ?)', [ChatId, SenderId, SentTime]);
        const messageId = rows.insertId;
        res.status(201).send({ message: "Sikeres adatrögzítés", data: { MessageId: messageId, ChatId, SenderId, SentTime } });
    } catch (err: any) {
        switch (err.errno) {
            case 1062: res.status(500).send({ error: { message: "Már létező üzenet" } });
            case 1045: res.status(500).send({ error: { message: "Hiba a csatlakozáskor nem megfelelő adatbázis jelszó" } });
            default: res.status(500).send({ error: { message: "Hiba az adatrögzítéskor" } });
        }
        return;
    }
}

export async function updateMessage(req: Request, res: Response) {
    if (!req.params.MessageId) {
        res.status(401).send({ error: "Hiányzó üzenet azonosító" });
        return;
    }

    const { ChatId, SenderId, SentTime } = req.body;
    try {
        const conn = await mysqlP.createConnection(dbConfig);
        const [rows]: any = await conn.execute('UPDATE messages SET ChatId = ?, SenderId = ?, SentTime = ? WHERE MessageId = ?', [ChatId, SenderId, SentTime, req.params.MessageId]);
        res.status(201).send({ message: "Sikeres módosítás", data: { MessageId: req.params.MessageId, ChatId, SenderId, SentTime } });
    } catch (err: any) {
        console.log(err);
        switch (err.errno) {
            case 1062: res.status(500).send({ error: { message: "Már létező üzenet!" } });
            case 1045: res.status(500).send({ error: { message: "Hiba a csatlakozáskor nem megfelelő adatbázis jelszó!" } });
            default: res.status(304).send({ error: { message: "Hiba a módosításkor!" } });
        }
        return;
    }
}

export async function deleteMessage(req: Request, res: Response) {
    if (!req.params.MessageId) {
        res.status(401).send({ error: "Hiányzó üzenet azonosító" });
        return;
    }

    try {
        const conn = await mysqlP.createConnection(dbConfig);
        const [rows]: any = await conn.execute('DELETE FROM messages WHERE MessageId = ?', [req.params.MessageId]);
        if (rows.affectedRows > 0) {
            res.status(200).send({ message: "Sikeres adattörlés!" });
            return;
        }
        res.status(404).send({ error: "Nem lett törölve adat!" });
    } catch (err: any) {
        console.log(err);
        switch (err.errno) {
            case 1045: res.status(500).send({ error: { message: "Hiba a csatlakozáskor nem megfelelő adatbázis jelszó" } });
            default: res.status(500).send({ error: { message: "Hiba a törléskor" } });
        }
        return;
    }
}
