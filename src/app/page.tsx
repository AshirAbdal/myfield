import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo or Brand Name */}
        <div className="text-xl font-bold text-gray-800">
          <Link href="/" legacyBehavior>
            <a>YourLogo</a>
          </Link>
        </div>
        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <Link href="/auth/SignUp" legacyBehavior>
            <a className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">
              Get Started
            </a>
          </Link>
          <Link href="/auth/SignIn" legacyBehavior>
            <a className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Sign In
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
}