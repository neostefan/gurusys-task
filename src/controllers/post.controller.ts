import type { Request, Response, NextFunction } from "express";
import * as PostServices from "../services/post.service";

class PostController {
    public async CreatePost(req: Request, res: Response, next: NextFunction) {
        try {
            const postData = req.body;
            const authorId = res.locals.userId;

            const newPost = await PostServices.createPost(authorId, postData);

            res.status(200).json({ message: 'post created successfully!', data: newPost, success: true })
        } catch (e) {
            next(e);
        }
    }

    public async UpdatePost(req: Request, res: Response, next: NextFunction) {
        try {
            const postData = req.body;
            const authorId = res.locals.userId;
            const postId = req.params.postId;

            const updatedPost = await PostServices.updatePost(postId, authorId, postData);

            res.status(200).json({ message: 'post updated successfully', data: updatedPost, success: true })
        } catch (e) {
            next(e);
        }
    }

    public async DeletePost(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = req.params.postId;
            const userId = res.locals.userId;

            const isDeleted = await PostServices.deletePost(postId, userId);

            res.status(200).json({ message: 'post deleted successfully!', success: isDeleted })
        } catch (e) {
            next(e);
        }
    }

    public async GetPosts(_: Request, res: Response, next: NextFunction) {
        try {
            const userId = res.locals.userId;

            const posts = await PostServices.getAllPosts(userId);

            res.status(200).json({ message: 'posts fetched successfully!', data: posts, success: true })
        } catch (e) {
            next(e);
        }
    }

    public async GetPost(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = req.params.postId

            const author = await PostServices.getPost(postId);

            res.status(200).json({ message: 'post fetched successfully!', data: author, success: true })
        } catch (e) {
            next(e);
        }
    }
}

export default PostController;