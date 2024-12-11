import API from "../config/apiClient";
import { Book } from "../models/book.model";


export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData extends LoginData {
    confirmPassword: string
}

export const register = async (data: RegisterData) => API.post("/auth/register", data);
export const login = async (data: LoginData) => API.post("/auth/login", data);
export const logout = async () => API.get("/auth/logout");
export const getUser = async () => API.get("/auth/user");


export const createBook = async (data: Omit<Book, '_id'>) => API.post("/books", data);
export const getBooks = async () => API.get(`/books`);
export const updateBook = async (id: string, data: Partial<Book>) => API.put(`/books/${id}`, data);
export const deleteBook = async (id: string,) => API.delete(`/books/${id}`); 