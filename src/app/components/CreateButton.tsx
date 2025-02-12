"use client";

import Link from "next/link";

export default function CreateButton() {
  return (
    <div className="w-full flex justify-end p-4">
      <Link href="/form">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
          Create Form
        </button>
      </Link>
    </div>
  );
}
