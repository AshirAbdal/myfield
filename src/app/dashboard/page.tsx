"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Header from "../components/Header"; 
import CreateButton from "../components/CreateButton"; 
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [forms, setForms] = useState<Array<{ _id: string; name: string }>>([]);

  useEffect(() => {
    const fetchFormData = async () => {
      if (status === "authenticated" && session?.user) {
        try {
          const response = await fetch("/api/formCount");
          const data = await response.json();

          if (data.success) {
            setForms(data.forms || []);
          }
        } catch (error) {
          console.error("Error fetching form data:", error);
        }
      }
    };

    fetchFormData();
  }, [session, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4 text-lg font-medium">You are not logged in.</p>
        <button
          onClick={() => window.location.href = "/login"}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center w-full relative">
        
        <div className="absolute top-4 right-4">
          <CreateButton />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-lg mb-6">
          Logged in as <span className="font-semibold">{session?.user?.email}</span>
        </p>

        <div className="w-full max-w-2xl px-4">
          <h2 className="text-xl font-semibold mb-4">Your Forms ({forms.length})</h2>
          {forms.length === 0 ? (
            <p className="text-gray-500">No forms created yet</p>
          ) : (
            <div className="space-y-2">
              {forms.map((form) => (
                <Link
                  key={form._id}
                  href={`/forms/${form._id}`}
                  className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-blue-500"
                >
                  <span className="text-blue-600 hover:text-blue-800 transition-colors">
                    {form.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
