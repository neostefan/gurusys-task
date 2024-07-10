import jsonwebtoken from "jsonwebtoken";

import Exception from "../common/exception";

interface AuthPayload extends jsonwebtoken.JwtPayload {
    userId: string;
}

export const decodeJWT = (token: string): AuthPayload => {
    const decoded =  jsonwebtoken.verify(token, "The Cow Says Moo!") as AuthPayload;

    if(!decoded) throw new Exception(401, 'Invalid Token!');

    if (typeof decoded === "string") throw new Exception(401, "Invalid Token");

    return decoded;
}

export const encodePayload = (payload: AuthPayload, expiresIn = '1h') => {
    return jsonwebtoken.sign(payload, "The Cow Says Moo!", {
        expiresIn
    });
}