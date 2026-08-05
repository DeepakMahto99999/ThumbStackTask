import Book from "../models/book.model.js";

/**
 * GET /api/dashboard
 */
export const getDashboard = async (req, res) => {
    try {
        const userId = req.user._id;

        const totalBooks = await Book.countDocuments({ userId });

        const reading = await Book.countDocuments({
            userId,
            status: "Reading",
        });

        const completed = await Book.countDocuments({
            userId,
            status: "Completed",
        });

        const wantToRead = await Book.countDocuments({
            userId,
            status: "Want to Read",
        });

        return res.status(200).json({
            success: true,
            data: {
                totalBooks,
                reading,
                completed,
                wantToRead,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard data.",
            error: error.message,
        });
    }
};