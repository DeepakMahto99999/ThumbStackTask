import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addBook } from "../controllers/book.controller.js";

const booksRouter = express.Router();

/**
 * POST /api/books
 */
booksRouter.post("/", authMiddleware, addBook);

export default booksRouter;