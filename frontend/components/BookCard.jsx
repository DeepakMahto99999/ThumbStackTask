"use client";
import {
    Trash2,
    Pencil,
} from "lucide-react"; 
export default function BookCard({
  book,
  onEdit,
  onDelete,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 text-green-700 ring-1 ring-inset ring-green-200";

      case "Reading":
        return "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200";

      default:
        return "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-200";
    }
  };

  return (
    <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-200/60">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold leading-tight text-gray-900">
            {book.title}
          </h2>

          <p className="mt-1 truncate text-sm text-gray-500">
            {book.author}
          </p>
        </div>

        <span
          className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
            book.status
          )}`}
        >
          {book.status}
        </span>
      </div>

      <div className="mt-5 flex-1">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Tags
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {book.tags?.length > 0 ? (
            book.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700"
              >
                #{tag}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-400">
              No tags
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-4">
        <button
          onClick={() => onEdit(book)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3.5 py-2 text-sm font-semibold text-blue-600 transition-all duration-150 hover:bg-blue-600 hover:text-white active:scale-95"
        >
           <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => onDelete(book._id)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3.5 py-2 text-sm font-semibold text-red-600 transition-all duration-150 hover:bg-red-600 hover:text-white active:scale-95"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}