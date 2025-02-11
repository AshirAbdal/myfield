"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { status } = useSession();

  return (
    <header className="w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center border-b">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="" width={40} height={40} />
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <nav className="flex gap-6 text-sm font-medium text-gray-700">
        <Link href="/whats-new" className="hover:text-blue-600">
          See what&apos;s new! 🎉
        </Link>
        <Link href="/forms" className="hover:text-blue-600">
          Forms
        </Link>
        <Link href="/account" className="hover:text-blue-600">
          Account
        </Link>
        <Link href="/docs" className="hover:text-blue-600">
          Docs
        </Link>
      </nav>

      {/* Right: Session Management */}
      <div>
        {status === "authenticated" ? (
          <button
            onClick={() => signOut()}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Log out
          </button>
        ) : (
          <Link href="/login" className="text-blue-500 hover:text-blue-700 text-sm font-medium">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
