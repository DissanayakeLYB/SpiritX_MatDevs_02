import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome to the Next.js Login/Signup App
        </h1>
        <nav className="flex space-x-4">
          <Link href="/signup">
            <span className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
              Signup
            </span>
          </Link>
          <Link href="/login">
            <span className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200">
              Login
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
