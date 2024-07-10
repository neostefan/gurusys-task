import Exception from "../common/exception";
import Post from "../models/database/post.model";
import type { createPostValidationDto, updatePostValidationDto } from "../models/validation/post.model";

export async function createPost(userId: string, newPost: createPostValidationDto['body']) {

    const createdPost = new Post({
        title: newPost.title,
        body: newPost.body,
        author: userId
    });

    console.log(createdPost.author);

    await createdPost.save();

    return createdPost;
}

export async function updatePost(postId: string, userId: string, data: updatePostValidationDto['body']) {

    const updatedPost = await Post.findOneAndUpdate({ _id: postId, author: userId }, {
        ...(data.body && { body: data.body }),
        ...(data.title && { title: data.title })
    }, { new: true })

    if (!updatedPost) throw new Exception(404, 'Post not found!');

    return updatedPost
}

export async function getAllPosts(userId: string) {
    const posts = await Post.find({ author: userId });

    return posts;
}

export async function getPost(postId: string) {
    const post = await Post.findById(postId);

    if (!post) throw new Exception(404, 'Post not found!');

    return post;
}

export async function deletePost(postId: string, userId: string) {
    const deletedPost = await Post.findOneAndDelete({ _id: postId, author: userId })

    if (!deletedPost) throw new Exception(404, 'Post not found!');

    return true;
}