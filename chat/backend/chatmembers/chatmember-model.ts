import { Request, Response } from "express";
import mysql from 'mysql2';
import mysqlP from 'mysql2/promise';
import dbConfig from '../app/config';
import { ChatMember } from "./chatmembers";

export async function getChatMemberFromId(req: Request, res: Response) {
    if (!req.params.UserId || !req.params.ChatId) {
        res.status(401).send({ error: "Hiányzó felhasználó vagy chat azonosító" });
        return;
    }
    const chatMember: ChatMember = new ChatMember();
    const siker = await chatMember.loadDataFromDB(parseInt(req.params.ChatId as string), parseInt(req.params.UserId as string));

    if (!siker) {
        res.status(500).send({ error: "Hiba az adatok lekérdezése során!" });
        return;
    }
    if (!chatMember.ChatId || !chatMember.UserId) {
        res.status(404).send({ error: "Nem létező chat tag" });
        return;
    }
    res.send(chatMember);
}

export function getChatMembers(req: Request, res: Response) {
    let conn = mysql.createConnection(dbConfig);
    conn.connect((err) => {
        if (err) {
            res.status(500).send({ error: "Nem sikerült csatlakozni az adatbázishoz!" });
            return;
        }
    });
    conn.query('SELECT * FROM chatmembers', (err, result: any) => {
        if (err) {
            res.status(500).send({ error: "Hiba az adatok lekérdezése során!" });
            return;
        }
        const chatMembers: any[] = result;
        if (chatMembers.length < 1) {
            res.status(404).send({ error: "Nem létező chat tagok" });
            return;
        }
        res.status(200).send(chatMembers);
    });
}

export async function addChatMember(req: Request, res: Response) {
    const { ChatId, UserId } = req.body;
    try {
        const conn = await mysqlP.createConnection(dbConfig);
        const [rows]: any = await conn.execute('INSERT INTO chatmembers (ChatId, UserId) VALUES (?, ?)', [ChatId, UserId]);
        res.status(201).send({ message: "Sikeres adatrögzítés", data: { ChatId, UserId } });
    }
    catch (err: any) {
        switch (err.errno) {
            case 1062: res.status(500).send({ error: { message: "Már létező chat tag" } });
            case 1045: res.status(500).send({ error: { message: "Hiba a csatlakozáskor nem megfelelő adatbázis jelszó" } });
            default: res.status(500).send({ error: { message: "Hiba az adatrögzítéskor" } });
        }
        return;
    }
}

export async function updateChatMember(req: Request, res: any) {
    if (!res.decodedToken.UserId || !req.body.ChatId) {
        res.status(401).send({ error: "Hiányzó paraméter" });
        return;
    }

    try {
        const conn = await mysqlP.createConnection(dbConfig);
        const [rows]: any = await conn.execute('UPDATE chatmembers SET ChatId = ? WHERE UserId = ?', [req.body.ChatId, res.decodedToken.UserId]);
        res.status(201).send({ message: "Sikeres adatrögzítés", data: { ChatId: req.body.ChatId, UserId: res.decodedToken.UserId } });
    }
    catch (err: any) {
        console.log(err);
        switch (err.errno) {
            case 1062: res.status(500).send({ error: { message: "Már létező chat tag!" } });
            case 1045: res.status(500).send({ error: { message: "Hiba a csatlakozáskor nem megfelelő adatbázis jelszó!" } });
            default: res.status(304).send({ error: { message: "Hiba a módosításkor!" } });
        }
        return;
    }
}

export async function deleteChatMember(req: Request, res: any) {
    if (!res.decodedToken.UserId || !req.body.ChatId) {
        res.status(401).send({ error: "Hiányzó paraméter" });
        return;
    }

    try {
        const conn = await mysqlP.createConnection(dbConfig);
        const [rows]: any = await conn.execute('DELETE FROM chatmembers WHERE UserId = ? AND ChatId = ?', [res.decodedToken.UserId, req.body.ChatId]);
        if (rows.affectedRows > 0) {
            res.status(200).send({ message: "Sikeres adattörlés!" });
            return;
        }
        res.status(404).send({ error: "Nem lett törölve adat!" });
    }
    catch (err: any) {
        console.log(err);
        switch (err.errno) {
            case 1045: res.status(500).send({ error: { message: "Hiba a csatlakozáskor nem megfelelő adatbázis jelszó" } });
            default: res.status(500).send({ error: { message: "Hiba a törléskor" } });
        }
        return;
    }
}
