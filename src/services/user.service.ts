import Exception from "../common/exception";
import Author, { type IAuthor } from "../models/database/user.model";

export async function GetAuthor(userId: string): Promise<IAuthor> {
    const existingAuthor = await Author.findById(userId);

    if(!existingAuthor) throw new Exception(404, 'Author not found!');

    return existingAuthor;
}