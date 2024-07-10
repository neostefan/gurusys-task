import z from "zod";

export const RegisterValidationSchema = z.object({
    body: z.object({
        email: z.string().email('enter a valid email!'),
        password: z.string(),
    }),
})

export type RegisterValidationDto = z.infer<typeof RegisterValidationSchema>;


export const LoginValidationSchema = z.object({
    body: z.object({
        email: z.string().email('enter a valid email!'),
        password: z.string()
    }),
})

export type LoginValidationDto = z.infer<typeof LoginValidationSchema>;
