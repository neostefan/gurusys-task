import type { Request, NextFunction, Response } from "express";
import * as AuthServices from "../services/auth.service";

class AuthController {
    public async Register(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = req.body;

            console.log(userData);

            const author = await AuthServices.Register(userData);

            res.status(200).json({ message: 'user registered!', data: author, success: true })
        } catch (e) {
            next(e);
        }
    }

    public async Login(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = req.body;

            const loginData = await AuthServices.LogIn(userData);

            res.status(200).json({ message: 'log in successful!', data: loginData, success: true })
        } catch (e) {
            next(e);
        }
    }
}

export default AuthController;