import { Router } from "express";
import type { Route } from "../common/interfaces/route";
import UserController from "../controllers/user.controller";
import AuthMiddleWare from "../middleware/auth.middleware";

class UserRoutes implements Route {
    path = '/user'
    router = Router();
    controller = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, AuthMiddleWare, this.controller.GetProfile);
    }
}

export default UserRoutes;