import { Router } from "express";
import { loginHandler, logoutHandler, refreshHandler, registerHandler } from "../controllers/auth.controller";
import { createBookHandler, deleteBookHandler, getBooksHandler, updateBookHandler } from "../controllers/book.controller";


const bookRoutes = Router();

// prefix: /books

bookRoutes.get("/", getBooksHandler)
bookRoutes.post("/", createBookHandler)
bookRoutes.put("/:id", updateBookHandler)
bookRoutes.delete("/:id", deleteBookHandler)

export default bookRoutes

