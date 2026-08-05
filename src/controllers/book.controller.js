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


/**
 * GET /api/books
 * GET /api/books?status=Completed
 * GET /api/books?tag=Programming
 */
export const getAllBooks = async (req, res) => {
    try {
        const { status, tag } = req.query;

        const filter = {
            userId: req.user._id,
        };

        if (status) {
            filter.status = status;
        }

        if (tag) {
            filter.tags = tag;
        }

        const books = await Book.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: books.length,
            data: books,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch books.",
            error: error.message,
        });
    }
};

/**
 * GET /api/books/:id
 */
export const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findOne({
            _id: id,
            userId: req.user._id,
        });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: book,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch book.",
            error: error.message,
        });
    }
};