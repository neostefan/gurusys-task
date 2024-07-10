import type { NextFunction, Request, Response } from "express";
import { decodeJWT } from "../utils/jwt.util";
import Exception from "../common/exception";
import { isValidObjectId } from "mongoose";

export default function AuthMiddleWare(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers.authorization

        if (!authorization) return next()

        const token = authorization.split(' ')[1]

        console.log(token);

        const decoded = decodeJWT(token)

        console.log(decoded);

        if(!decoded.exp) throw new Exception(401, 'Please log in again!')

        const currentTime = new Date().getTime() / 1000;

        if (currentTime > decoded.exp) throw new Exception(401, 'Token expired!')
        
        if (!isValidObjectId(decoded.userId)) throw new Exception(401, 'Invalid id in token!');

        res.locals.userId = decoded.userId;

        next();

    } catch (e) {
        next(e);
    }
}