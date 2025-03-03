// app/protected/page.tsx
"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function ProtectedPage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-800 dark:text-gray-300">
          You shouldn’t see this—middleware should redirect to /login!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          MyApp
        </Link>
        <div>
          {user && (
            <button
              onClick={() => logout()}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition duration-200"
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>

      <div className="flex items-center justify-center flex-grow bg-gray-100 dark:bg-gray-800">
        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Protected Page
          </h1>
          <p className="text-gray-800 dark:text-gray-300">
            Welcome, {user}! This is a protected route.
          </p>
        </div>
      </div>
    </div>
  );
}