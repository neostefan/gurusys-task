import type { NextFunction, Request, Response } from "express";
import * as UserServices from "../services/user.service";

class UserController {
    public async GetProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = res.locals.userId

            const author = await UserServices.GetAuthor(userId);

            res.status(200).json({ message: 'user fetched successfully!', data: author, success: true })
        } catch (e) {
            next(e);
        }
    }
}

export default UserController