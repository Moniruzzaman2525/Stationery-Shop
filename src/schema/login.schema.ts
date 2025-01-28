import { z } from "zod";


export const loginSchema = z.object({
    password: z.string({
        required_error: 'Password is required'
    }),
    email: z.string({
        required_error: 'Email address is required'
    }),
})
export const registrationSchema = z
    .object({
        name: z.string({
            required_error: "Full Name is required",
        }),
        password: z
            .union([
                z.string({
                    required_error: "Password is required"
                }),
                z.number({
                    required_error: "Password is required"
                }),
            ])
            .refine((value) => typeof value === "string" || typeof value === "number", {
                message: "Password must be a string or number",
            })
            .transform((value) => value.toString()), 
        confirmPassword: z
            .union([
                z.string({
                    required_error: "Confirm Password is required"
                }),
                z.number({
                    required_error: "Confirm Password is required"
                }),
            ])
            .refine((value) => typeof value === "string" || typeof value === "number", {
                message: "Confirm Password must be a string or number",
            })
            .transform((value) => value.toString()), 
        email: z.string({
            required_error: "Email address is required",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });


