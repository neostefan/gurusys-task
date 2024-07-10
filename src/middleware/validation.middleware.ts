import type { Request, Response, NextFunction } from "express";
import type z from "zod";
import Exception from "../common/exception";

export default function ValidationMiddleware(schema: z.ZodSchema) {
    return (req: Request, _: Response, next: NextFunction) => {
    
        const dataToValidate = {
            ...(req.query && { query: req.query }),
            ...(req.params && { params: req.params }),
            ...(req.body && { body: req.body }),
        }

        const validationResult = schema.safeParse(dataToValidate)

        if (!validationResult.success) throw new Exception(400, validationResult.error.message)
        
        req.body = validationResult.data.body
        req.query = validationResult.data.query
        req.params = validationResult.data.params
        
        next()
    }
}