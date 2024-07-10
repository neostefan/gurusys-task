import Exception from "../common/exception";
import Author, { type IAuthor } from "../models/database/user.model";
import type { LoginValidationDto, RegisterValidationDto } from "../models/validation/auth.model";
import { encodePayload } from "../utils/jwt.util";

export async function Register(userData: RegisterValidationDto['body']): Promise<IAuthor> {
    const existingUser = await Author.findOne({ email: userData.email })

    if(existingUser) throw new Exception(400, 'User already exists with that email!')

    const newUser = new Author({
        email: userData.email,
        password: userData.password
    })

    await newUser.save()

    return newUser;
}

export async function LogIn(userData: LoginValidationDto['body']): Promise<{ token: string, author: IAuthor }> {
    const existingUser = await Author.findOne({ email: userData.email });

    if (!existingUser) throw new Exception(404, 'Please register first!');

    const isValid = await existingUser.comparePassword(userData.password);

    if (!isValid) throw new Exception(400, 'Invalid Password');

    const token = encodePayload({ userId: existingUser.id });

    return { token, author: existingUser };
}