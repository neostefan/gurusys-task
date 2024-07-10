import { Router } from "express";
import type { Route } from "../common/interfaces/route";
import AuthController from "../controllers/auth.controller";
import ValidationMiddleware from "../middleware/validation.middleware";
import { LoginValidationSchema, RegisterValidationSchema } from "../models/validation/auth.model";

class AuthRoutes implements Route {
    path = '/auth'
    router = Router();
    controller = new AuthController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/login`, ValidationMiddleware(LoginValidationSchema), this.controller.Login);

        this.router.post(`${this.path}/register`, ValidationMiddleware(RegisterValidationSchema), this.controller.Register);
    }
}

export default AuthRoutes;