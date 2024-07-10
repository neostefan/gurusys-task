import express from "express";
import type { Route } from "../common/interfaces/route";
import AuthMiddleWare from "../middleware/auth.middleware";
import ValidationMiddleware from "../middleware/validation.middleware";
import PostController from "../controllers/post.controller";
import { createPostValidationSchema, singlePostValidationSchema, updatePostValidationSchema } from "../models/validation/post.model";

class PostRoutes implements Route {
    path = '/post'
    router = express.Router()
    controller = new PostController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, AuthMiddleWare, this.controller.GetPosts)

        this.router.get(`${this.path}/:postId`, AuthMiddleWare, ValidationMiddleware(singlePostValidationSchema), this.controller.GetPost)

        this.router.post(`${this.path}`, AuthMiddleWare, ValidationMiddleware(createPostValidationSchema), this.controller.CreatePost)

        this.router.put(`${this.path}/:postId`, AuthMiddleWare, ValidationMiddleware(updatePostValidationSchema), this.controller.UpdatePost)

        this.router.delete(`${this.path}/:postId`, AuthMiddleWare, ValidationMiddleware(singlePostValidationSchema), this.controller.DeletePost)
    }
}

export default PostRoutes