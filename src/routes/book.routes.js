import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { 
    addBook,
    deleteBook,
    getAllBooks,
    getSingleBook,
    updateBook
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

/**
 * patch /api/books/:id
 */
booksRouter.patch("/:id", authMiddleware, updateBook);

/**
 * DELETE /api/books/:id
 */
booksRouter.delete("/:id", authMiddleware, deleteBook);

export default booksRouter;