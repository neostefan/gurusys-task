import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IAuthor extends mongoose.Document {
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
    createdAt: Date;
    updatedAt: Date;
}

const AuthorSchema = new mongoose.Schema<IAuthor>({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

AuthorSchema.pre('save', function(next) {
    const author = this  as unknown as IAuthor;

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(author.password, salt);

    author.password = hashedPassword;

    return next()
});

AuthorSchema.methods.comparePassword = async function(password: string) {
    const author = this as unknown as IAuthor;

    return bcrypt.compare(password, author.password).catch(e => false);
}

const Author = mongoose.model('author', AuthorSchema);

export default Author;