import { z } from "zod";

export const productSchema = z.object({
    name: z.string({ required_error: 'Product Name is required' }),
    brand: z.string({ required_error: 'Product brand is required' }),
    quantity: z
        .number({ required_error: 'Product quantity is required' })
        .min(1, "Quantity must be at least 1")
        .or(z.string().refine((val) => !isNaN(parseInt(val, 10)), "Quantity must be a valid number")),
    category: z.string({ required_error: 'Product category is required' }),
    description: z.string({ required_error: 'Product description is required' }),
    photo: z
        .instanceof(File, { message: "Photo must be a valid file" })
        .refine((file) => file.size > 0, "A file must be selected"),
    price: z.number({ required_error: 'Product price is required' })
        .min(0.01, "Price must be greater than 0")
        .or(z.string().refine((val) => !isNaN(parseFloat(val)), "Price must be a valid number")),
    inStock: z
        .number({ required_error: 'Product stock quantity is required' })
        .min(0, "Stock must be a non-negative number")
        .or(z.string().refine((val) => !isNaN(parseInt(val, 10)), "Stock must be a valid number")),

});


export const updateProductSchema = z.object({
    name: z.string({ required_error: 'Product Name is required' }),
    stock: z.boolean().optional(),
    brand: z.string({ required_error: 'Product brand is required' }),
    quantity: z
        .number({ required_error: 'Product quantity is required' })
        .min(1, "Quantity must be at least 1")
        .or(z.string().refine((val) => !isNaN(parseInt(val, 10)), "Quantity must be a valid number")),
    category: z.string({ required_error: 'Product category is required' }),
    description: z.string({ required_error: 'Product description is required' }),
    price: z.number({ required_error: 'Product price is required' })
        .min(0.01, "Price must be greater than 0")
        .or(z.string().refine((val) => !isNaN(parseFloat(val)), "Price must be a valid number")),
    inStock: z
        .number({ required_error: 'Product stock quantity is required' })
        .min(0, "Stock must be a non-negative number")
        .or(z.string().refine((val) => !isNaN(parseInt(val, 10)), "Stock must be a valid number")),

});

