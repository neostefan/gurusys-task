import { isValidObjectId } from "mongoose";
import z from "zod";

export const createPostValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        body: z.string(),
    })
})

export type createPostValidationDto = z.infer<typeof createPostValidationSchema>;

export const updatePostValidationSchema = z.object({
    params: z.object({
        postId: z.string().refine(arg => isValidObjectId(arg), 'Enter a valid post id')
    }),
    body: z.object({
        title: z.string(),
        body: z.string(),
    })
})

export type updatePostValidationDto = z.infer<typeof updatePostValidationSchema>;


export const singlePostValidationSchema = z.object({
    params: z.object({
        postId: z.string().refine(arg => isValidObjectId(arg), 'Enter a valid post id')
    })
})

export type singlePostValidationDto = z.infer<typeof singlePostValidationSchema>;