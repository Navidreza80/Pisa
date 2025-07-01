"use client";
import Link from "next/link";
import "../app/[locale]/globals.css";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-2">
        The page you’re looking for doesn’t exist.
      </p>
      <p className="text-gray-500 mb-6">
        It might have been moved, deleted, or never existed at all.
      </p>
      <Link href="/">
        <p className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
          Go to Homepage
        </p>
      </Link>
    </div>
  );
}
