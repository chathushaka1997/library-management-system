import mongoose from "mongoose";

export interface BookDocument extends mongoose.Document {
    title: string;
    author: string;
    genre: string;
    publicationDate: Date;
}

const bookSchema = new mongoose.Schema<BookDocument>({
    title: { type: String, required: true, },
    author: { type: String, required: true, },
    genre: { type: String, required: true, },
    publicationDate: {
        type: Date,
        required: true,
    },
});

const BookModel = mongoose.model<BookDocument>("Book", bookSchema);
export default BookModel;