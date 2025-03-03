// src/app/protected/page.tsx
"use client"; // Marks this as a Client Component (runs in browser)

import Link from "next/link"; // For navigation links
import { useAuth } from "../context/AuthContext"; // Custom hook to access auth state
import { useRouter } from "next/navigation"; // Hook for programmatic routing
import { useEffect } from "react"; // Hook to run side effects (like fetching)

// Export the ProtectedPage component
export default function ProtectedPage() {
  const { user, logout } = useAuth(); // Destructure user state and logout function from context
  const router = useRouter(); // Get router instance for redirects

  // Run this effect once on mount to check auth status
  useEffect(() => {
    fetch("/api/auth/check-auth") // Fetch the Serverless Function
      .then((res) => { // Handle the response
        if (res.status === 401) router.push("/login"); // If 401 (Unauthorized), redirect to login
      })
      .catch(() => router.push("/login")); // If fetch fails (e.g., network error), redirect to login
  }, [router]); // Dependency array—runs if router changes (rare, mostly runs once)

  // If no user in context, show a loading state while checking auth
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-800 dark:text-gray-300">
          Checking auth... {/* Brief message while fetch happens */}
        </p>
      </div>
    );
  }

  // If user exists, render the protected content
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navigation bar */}
      <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          MyApp {/* Home link */}
        </Link>
        <div>
          {user && ( // Only show Sign Out if user is logged in
            <button
              onClick={() => logout()} // Call logout from AuthContext (clears cookie, redirects)
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition duration-200"
            >
              Sign Out {/* Button to log out */}
            </button>
          )}
        </div>
      </nav>

      {/* Main content */}
      <div className="flex items-center justify-center flex-grow bg-gray-100 dark:bg-gray-800">
        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Protected Page {/* Page title */}
          </h1>
          <p className="text-gray-800 dark:text-gray-300">
            Welcome, {user}! This is a protected route. {/* Personalized welcome */}
          </p>
        </div>
      </div>
    </div>
  );
}