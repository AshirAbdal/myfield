'use client'

import NavBar from "../../components/~header/page";
import { useState, useEffect } from "react";

export default function Form() {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setFormData(data.products))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex justify-center items-center py-10">
        <div className="w-3/4 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-center">Fetched Form Data</h2>
          <div className="border-t border-gray-300 my-4"></div>
          
          {formData.length > 0 ? (
            <div className="space-y-6">
              {formData.map((data, index) => (
                <div key={index} className="border p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg mb-2">Form {index + 1} Data</h3>
                  <p><strong>Name:</strong> {data.name}</p>
                  <p><strong>Email:</strong> {data.email}</p>
                  <p><strong>Message:</strong> {data.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No form data found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
