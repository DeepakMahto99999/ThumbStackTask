import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required."],
        },
        
        title: {
            type: String,
            required: [true, "Book title is required."],
            trim: true,
        },

        author: {
            type: String,
            required: [true, "Author name is required."],
            trim: true,
        },

        tags: {
            type: [String],
            default: [],
        },

        status: {
            type: String,
            enum: ["Want to Read", "Reading", "Completed"],
            default: "Want to Read",
        },

    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;