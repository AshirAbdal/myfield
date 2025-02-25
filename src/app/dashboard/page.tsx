"use client";
import { useSession } from "next-auth/react";
import {  useEffect, useState } from "react";
import Header from "../components/Header"; 
import CreateButton from "../components/CreateButton"; 
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [forms, setForms] = useState<
    Array<{ _id: string; name: string; requestURLs: string[] }>
  >([]);
  const [, setSelectedForm] = useState<{ _id: string; name: string; requestURLs: string[] } | null>(null);
  const [entryDetails, setEntryDetails] = useState<{
    apiEndpoint: string;
    entries: Array<{ name: string; email: string; message: string }>;
  } | null>(null);

  useEffect(() => {
    const fetchFormData = async () => {
      if (status === "authenticated" && session?.user) {
        try {
          const response = await fetch("/api/formCount");
          const data = await response.json();

          console.log("Fetched form data:", data); // Debugging

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

  const fetchEntryDetails = async (formId: unknown) => {
    try {
      const response = await fetch(`/api/entryDetails/${formId}`);
      const data = await response.json();
      if (data.success) {
        setEntryDetails(data.entryDetails);
      }
    } catch (error) {
      console.error("Error fetching entry details:", error);
    }
  };

  const handleFormClick = (form: { _id: string; name: string; requestURLs: string[] }) => {
    setSelectedForm(form);
    if (form) {
      fetchEntryDetails(form._id);
    }
  };

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center w-full relative">
        <div className="absolute top-4 right-4">
          <CreateButton />
        </div>

        <div className="w-full max-w-2xl px-4">
          <h2 className="text-xl font-semibold mb-4">Your Forms ({forms.length})</h2>
          {forms.length === 0 ? (
            <p className="text-gray-500">No forms created yet</p>
          ) : (
            <div className="space-y-4">
              {forms.map((form) => (
                <div
                  key={form._id}
                  className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  onClick={() => handleFormClick(form)}
                >
                  <Link href={`/CreateForm`}>
                    <h3 className="text-blue-600 hover:text-blue-800 font-semibold">
                      {form.name}
                    </h3>
                  </Link>
                  {form.requestURLs.length > 0 ? (
                    <ul className="mt-2 text-gray-700 text-sm">
                      {form.requestURLs.map((url, index) => (
                        <li key={index} className="truncate">
                          <a href={url} target="_blank" className="text-blue-500 hover:underline">
                            {url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">No request URLs</p>
                  )}
                </div>
              ))}
            </div>
          )}
          {entryDetails && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold">Entry Details</h3>
              <p>API Endpoint: <a href={entryDetails.apiEndpoint} className="text-blue-500 hover:underline">{entryDetails.apiEndpoint}</a></p>
              <h4 className="mt-4">Associated Entries</h4>
              <ul>
                {entryDetails.entries.map((entry, index) => (
                  <li key={index} className="mt-2">
                    <p>Name: {entry.name}</p>
                    <p>Email: <a href={`mailto:${entry.email}`} className="text-blue-500 hover:underline">{entry.email}</a></p>
                    <p>Message: {entry.message}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </>
  );
}