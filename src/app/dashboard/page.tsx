"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../components/Header"; 
import CreateButton from "../components/CreateButton"; 

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [forms, setForms] = useState<Array<{ _id: string; name: string }>>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFormData = async () => {
      if (session?.user) {
        try {
          const response = await fetch("/api/formCount");
          const contentType = response.headers.get("content-type");
          
          if (!contentType?.includes("application/json")) {
            throw new Error("Invalid JSON response");
          }

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
  }, [session]);

  // ... loading and other existing code ...

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center w-full relative">
        <div className="absolute top-4 right-4">
          <CreateButton />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
        {session?.user && (
          <p className="text-lg mb-6">
            Logged in as <span className="font-semibold">{session.user.email}</span>
          </p>
        )}

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
