import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to the User Management System</h1>
        <p className="text-gray-700">Navigate to the Users page to see all users and manage them.</p>
        <Link
          href="/users"
          className="mt-6 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Go to Users List Page
        </Link>
      </div>
    </main>
  );
}
