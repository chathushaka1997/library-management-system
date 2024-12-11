import BookModel from "../models/book.model";

export type createBookParams = {
    title: string;
    author: string;
    genre: string;
    publicationDate: Date;
};

export const createBook = async ({ title, author, genre, publicationDate }: createBookParams) => {

    const book = await BookModel.create({
        title,
        author,
        genre,
        publicationDate
    })

    return { book }

}