"use client";

import NavBar from "../components/~header/page";

export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-lg relative">
          {/* Upper-left and Upper-right positioning */}
          <div className="absolute top-4 left-4">
            <h1 className="text-2xl font-bold">Your Forms</h1>
          </div>
          <div className="absolute top-4 right-4">
            <a
              href="/dashboard/createForm"
              className="bg-[#525e9e] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              NEW FORM
            </a>
          </div>

          <div className="flex items-center justify-center mb-6 mt-12">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v12m-3-3h6m-6-3v6"
              ></path>
            </svg>
          </div>

          <p className="text-gray-500 text-center mb-6">
            There doesn't seem to be anything here!
          </p>
          <p className="text-gray-500 text-center mb-6">
            Get started by adding your first form
          </p>
        </div>
      </div>
    </div>
  );
}
