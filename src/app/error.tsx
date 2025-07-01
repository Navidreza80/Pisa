"use client"
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Error</h1>
      <p className="text-gray-700 mb-2">Something went wrong</p>
      <p className="text-gray-500 mb-6">pleas try again later</p>
      <Link href="/">
        <p className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
          Return to Homepage
        </p>
      </Link>
    </div>
  );
}
