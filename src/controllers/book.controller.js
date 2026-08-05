import Book from "../models/book.model.js";


/**
 *  - user addbook controller
 *  - POST /api/books
 */
export const addBook = async (req, res) => {

    try {

        const { title, author, tags, status } = req.body;

        if (!title || !author) {
            return res.status(400).json({
                success: false,
                message: "Title and author are required.",
            });
        }

        const savedBook = await Book.create({
            userId: req.user._id,
            title,
            author,
            tags,
            status,
        });

        return res.status(201).json({
            success: true,
            message: "Book added successfully.",
            data: savedBook,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to add book.",
            error: error.message,
        });
    }
};


