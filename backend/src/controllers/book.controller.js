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


/**
 * PATCH /api/books/:id
 */
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, tags, status } = req.body;

        const updates = {};

        if (title !== undefined) updates.title = title;
        if (author !== undefined) updates.author = author;
        if (tags !== undefined) updates.tags = tags;
        if (status !== undefined) updates.status = status;

        const updatedBook = await Book.findOneAndUpdate(
            {
                _id: id,
                userId: req.user._id,
            },
            updates,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book updated successfully.",
            data: updatedBook,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update book.",
            error: error.message,
        });
    }
};

/**
 * DELETE /api/books/:id
 */
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await Book.findOneAndDelete({
            _id: id,
            userId: req.user._id,
        });

        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book deleted successfully.",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete book.",
            error: error.message,
        });
    }
};