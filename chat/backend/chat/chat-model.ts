import { Request, Response } from "express";
import mysql from 'mysql2';
import mysqlP from 'mysql2/promise';
import dbConfig from '../app/config';

export async function getChatFromId(req: Request, res: Response) {
    if (!req.params.ChatId) {
        res.status(401).send({ error: "Hiányzó chat azonosító" });
        return;
    }
    const conn = await mysqlP.createConnection(dbConfig);
    const [rows]: any = await conn.execute('SELECT ChatName FROM chats WHERE ChatId = ?', [parseInt(req.params.ChatId as string)]);
    if (rows.length === 0) {
        res.status(404).send({ error: "Nem létező chat" });
        return;
    }
    res.send(rows[0]);
}

export function getChats(req: Request, res: Response) {
    let conn = mysql.createConnection(dbConfig);
    conn.connect((err) => {
        if (err) {
            res.status(500).send({ error: "Nem sikerült csatlakozni az adatbázishoz!" });
            return;
        }
    });
    conn.query('SELECT ChatId, ChatName FROM chats', (err, result: any) => {
        if (err) {
            res.status(500).send({ error: "Hiba az adatok lekérdezése során!" });
            return;
        }
        if (result.length < 1) {
            res.status(404).send({ error: "Nem létező chat" });
            return;
        }
        res.status(200).send(result);
    });
}

export async function addChat(req: Request, res: Response) {
    const chat = req.body;
    try {
        const conn = await mysqlP.createConnection(dbConfig);
        const [rows]: any = await conn.execute('INSERT INTO chats (ChatName) VALUES (?)', [chat.ChatName]);
        chat.ChatId = rows.insertId;
        res.status(201).send({ message: "Sikeres adatrögzítés", data: chat });
    } catch (err: any) {
        switch (err.errno) {
            case 1062: res.status(500).send({ error: { message: "Már létező chat név" } });
            case 1045: res.status(500).send({ error: { message: "Hiba a csatlakozáskor nem megfelelő adatbázis jelszó" } });
            default: res.status(500).send({ error: { message: "Hiba az adatrögzítéskor" } });
        }
        return;
    }
}

export async function updateChat(req: Request, res: any) {
    if (!res.decodedToken.ChatId) {
        res.status(401).send({ error: "Hiányzó paraméter" });
        return;
    }

    const chat = req.body;
    try {
        const conn = await mysqlP.createConnection(dbConfig);
        const [rows]: any = await conn.execute('UPDATE chats SET ChatName = ? WHERE ChatId = ?', [chat.ChatName, res.decodedToken.ChatId]);
        res.status(201).send({ message: "Sikeres adatrögzítés", data: chat });
    } catch (err: any) {
        console.log(err);
        switch (err.errno) {
            case 1062: res.status(500).send({ error: { message: "Már létező chat név!" } });
            case 1045: res.status(500).send({ error: { message: "Hiba a csatlakozáskor nem megfelelő adatbázis jelszó!" } });
            default: res.status(304).send({ error: { message: "Hiba a módosításkor!" } });
        }
        return;
    }
}

export async function deleteChat(req: Request, res: any) {
    if (!res.decodedToken.ChatId) {
        res.status(401).send({ error: "Hiányzó paraméter" });
        return;
    }

    try {
        const conn = await mysqlP.createConnection(dbConfig);
        const [rows]: any = await conn.execute('DELETE FROM chats WHERE ChatId = ?', [res.decodedToken.ChatId]);
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
