"use client";

import { useState , useEffect } from "react";

export default function AddBookModal({
    isOpen,
    onClose,
    onSubmit,
    editingBook,
}) {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        tags: "",
        status: "Want to Read",
    });

    useEffect(() => {
        if (editingBook) {
            setFormData({
                title: editingBook.title,
                author: editingBook.author,
                tags: editingBook.tags?.join(", ") || "",
                status: editingBook.status,
            });
        } else {
            setFormData({
                title: "",
                author: "",
                tags: "",
                status: "Want to Read",
            });
        }
    }, [editingBook]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            ...formData,
            tags: formData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
        });

        setFormData({
            title: "",
            author: "",
            tags: "",
            status: "Want to Read",
        });
    };



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        {editingBook ? "Edit Book" : "Add Book"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-red-500"
                    >
                        &times;
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label className="mb-1 block font-medium">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Atomic Habits"
                            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">
                            Author
                        </label>

                        <input
                            type="text"
                            name="author"
                            required
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="James Clear"
                            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">
                            Tags
                        </label>

                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="Self Help, Productivity"
                            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                        />

                        <p className="mt-1 text-sm text-gray-500">
                            Separate tags with commas.
                        </p>
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">
                            Status
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                        >
                            <option>Want to Read</option>
                            <option>Reading</option>
                            <option>Completed</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border px-5 py-2 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                        >
                            {editingBook ? "Update Book" : "Add Book"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}