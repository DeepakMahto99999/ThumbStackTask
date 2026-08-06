"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg shadow-sm shadow-blue-200">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <h1 className="cursor-pointer text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
            Book Manager
          </h1>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold leading-tight text-gray-900">
              {user?.name || "Guest"}
            </p>
            <p className="text-xs leading-tight text-gray-500">
              {user?.email}
            </p>
          </div>

          {/* Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600 ring-1 ring-blue-100 sm:hidden">
            {(user?.name || "G").charAt(0).toUpperCase()}
          </div>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-150 hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95 sm:px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}