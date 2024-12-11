import { z } from "zod";


const titleSchema = z.string().min(6).max(255)
const authorSchema = z.string().min(2).max(255)
const genreSchema = z.string().min(6).max(255)
const publicationDateSchema = z.preprocess((val) => {
    if (typeof val === 'string' || val instanceof String) {
        return new Date(val.toString());
    }
    return val;
}, z.date());

export const createBookSchema = z.object({
    title: titleSchema,
    author: authorSchema,
    genre: genreSchema,
    publicationDate: publicationDateSchema
})

export const updateBookSchema = z.object({
    title: titleSchema.optional(),
    author: authorSchema.optional(),
    genre: genreSchema.optional(),
    publicationDate: publicationDateSchema.optional(),
});

