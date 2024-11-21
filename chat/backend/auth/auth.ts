import {Response,Request} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export default function verfyToken(req:Request,res:any,next:any) {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (!token)
    {
        res.status(401).send({error:"Token szükséges a végpont használatához!"})
        return
    }

    const {JWT_STRING} = process.env
    if (!JWT_STRING)
    {
        res.status(401).send({error:"Hiba történt a token ellenörzése során!"})
        return  
    }
    try {
        const decodedToken = jwt.verify(token,JWT_STRING)
        res.decodedToken = decodedToken
        next()
    } catch {
        res.status(401).send({error:"Hibás token"})
        return
    }
  
    
}