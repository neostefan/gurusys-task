import mongoose, { type Types } from "mongoose";
import type { IAuthor } from "./user.model";

type AuthorField<T> = T extends true ? IAuthor : Types.ObjectId;

interface IPost<A = false> extends mongoose.Document {
    title: string;
    body: string;
    author: AuthorField<A>;
}

const PostSchema = new mongoose.Schema<IPost>({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

const Post = mongoose.model('post', PostSchema)

export default Post