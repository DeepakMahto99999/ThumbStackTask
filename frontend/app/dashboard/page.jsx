"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import BookCard from "@/components/BookCard";
import AddBookModal from "@/components/AddBookModal";

import { useAuth } from "@/context/AuthContext";

import {
  getBooks,
  addBook,
  deleteBook,
  updateBook
} from "@/services/book";

import { logoutUser } from "@/services/auth";
import { BookOpen, CheckCircle, Plus } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const { user, logout } = useAuth();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingBook, setEditingBook] = useState(null)

  const fetchBooks = async () => {
    try {
      const res = await getBooks();

      setBooks(res.data.data || []);
    } catch (error) {
      console.error(error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (bookData) => {
    try {
      if (editingBook) {
        await updateBook(editingBook._id, bookData);
        setEditingBook(null);
      } else {
        await addBook(bookData);
      }

      fetchBooks();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBook = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBook(id);

      fetchBooks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();

      logout();

      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const totalBooks = books.length;

  const completedBooks = books.filter(
    (book) => book.status === "Completed"
  ).length;

  const readingBooks = books.filter(
    (book) => book.status === "Reading"
  ).length;

  const wantToReadBooks = books.filter(
    (book) => book.status === "Want to Read"
  ).length;



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        onLogout={handleLogout}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your personal book collection
            </p>
          </div>

          <button
            onClick={() => {
              setEditingBook(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition-all duration-150 hover:bg-blue-700 hover:shadow-md active:scale-95"
          >
            <Plus size ={16} />
            Add Book
          </button>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">
                Total Books
              </h3>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-gray-900">
              {totalBooks}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">
                Want To Read
              </h3>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-yellow-600">
              {wantToReadBooks}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">
                Reading
              </h3>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
               <BookOpen size={16} />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-blue-600">
              {readingBooks}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">
                Completed
              </h3>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
               <CheckCircle size={16} />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-green-600">
              {completedBooks}
            </p>
          </div>

        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-20 shadow-sm">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
            <p className="mt-4 text-sm font-medium text-gray-500">
              Loading books...
            </p>
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No books found
            </h2>

            <p className="mt-1.5 max-w-sm text-sm text-gray-500">
              Your library is empty. Click "Add Book" to create your first entry and start tracking your reading.
            </p>

            <button
              onClick={() => {
                setEditingBook(null);
                setIsModalOpen(true);
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Book
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onEdit={handleEditBook}
                onDelete={handleDeleteBook}
              />
            ))}
          </div>
        )}

      </div>

      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBook(null);
        }}
        onSubmit={handleAddBook}
        editingBook={editingBook}
      />
    </div>
  );
}