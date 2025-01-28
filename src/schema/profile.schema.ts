import { z } from "zod";

export const profileSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
    }),
    age: z.string({
        required_error: 'Age is required',
    }),
    email: z.string().optional(),
    gender: z.string({
        required_error: 'Gender is required',
    }),
    phone: z.string({
        required_error: 'Phone Number is required',
    }),
    blood: z.string().optional(),
});
