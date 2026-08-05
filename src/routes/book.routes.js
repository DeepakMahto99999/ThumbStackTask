import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { 
    addBook,
    getAllBooks,
    getSingleBook
} from "../controllers/book.controller.js";

const booksRouter = express.Router();

/**
 * POST /api/books
 */
booksRouter.post("/", authMiddleware, addBook);

/**
 * get /api/books
 */
booksRouter.get("/" , authMiddleware , getAllBooks);

/**
 * get /api/books/:id
 */
booksRouter.get("/:id" , authMiddleware , getSingleBook)

export default booksRouter;