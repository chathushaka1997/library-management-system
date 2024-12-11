import { z } from "zod";
import { CREATED, NOT_FOUND, OK } from "../constants/http";
import BookModel from "../models/book.model";
import { createBook } from "../services/book.services";
import catchErrors from "../utils/catchErrors";
import { createBookSchema, updateBookSchema } from "./book.schemas";
import appAssert from "../utils/appAssert";


export const getBooksHandler = catchErrors(async (req, res) => {

    const books = await BookModel.find();

    return res.status(OK).json({ data: { books } })
});

export const createBookHandler = catchErrors(async (req, res) => {


    const request = createBookSchema.parse(req.body);

    const { book } = await createBook(request);

    return res.status(CREATED).json({ data: book });
});

export const updateBookHandler = catchErrors(async (req, res) => {

    const bookId = z.string().parse(req.params.id)
    const book = await BookModel.findById(bookId)
    appAssert(bookId && book, NOT_FOUND, "Book not found");

    const request = updateBookSchema.parse(req.body);

    const updatedBook = await BookModel.findByIdAndUpdate(bookId, request, { new: true });

    return res.status(OK).json({ data: updatedBook });
});

export const deleteBookHandler = catchErrors(async (req, res) => {

    const bookId = z.string().parse(req.params.id)
    const book = await BookModel.findById(bookId)
    appAssert(bookId && book, NOT_FOUND, "Book not found");

    await BookModel.findByIdAndDelete(bookId);

    return res.status(OK).json({ message: "Book deleted" });
});