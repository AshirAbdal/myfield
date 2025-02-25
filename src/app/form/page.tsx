"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function Form() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      const result = contentType?.includes("application/json") ? await response.json() : {};
  
      setLoading(false);
  
      if (response.ok) {
        setMessage(result.message || "Data saved successfully!");
        setFormData({ name: "", email: "" }); // Reset form
  
        if (result.id) {
          localStorage.setItem("lastInsertedId", result.id); // Save the ID
        }
  
        router.push("/CreateForm"); // Redirect
      } else {
        setMessage(result.message || "Error saving data!");
      }
  
    } catch (error) {
      console.error("Submission error:", error);
      setLoading(false);
      setMessage("An unexpected error occurred. Please try again.");
    }
  };
  
  
  

  return (
    <div>
      <Header />

      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Create New Entry</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Create"}
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}
