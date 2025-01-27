import { z } from "zod";


export const loginSchema = z.object({
    password: z.string({
        required_error: 'Password is required'
    }),
    email: z.string({
        required_error: 'Email address is required'
    }),
})
export const registrationSchema = z.object({
    name: z.string({
        required_error: 'Full Name is required'
    }),
    password: z
        .string()
        .min(10, "Password must be at least 10 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character"),

    confirmPassword: z.string({
        required_error: 'Confirm password is required'
    }),
    email: z.string({
        required_error: 'Email address is required'
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
});


