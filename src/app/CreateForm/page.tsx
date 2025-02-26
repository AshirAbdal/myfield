// "use client";

// import { useEffect, useState } from "react";
// import Header from "../components/Header";

// export default function CreateForm() {
//   const [id, setId] = useState("");
//   const [relatedData, setRelatedData] = useState<
//     { _id: string; name: string; email: string; message: string }[]
//   >([]);
//   const [loading, setLoading] = useState(true); // Correctly manage loading state
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchLatestFirstForm = async () => {
//       setLoading(true); // Ensure loading starts before the fetch
//       setError(""); // Clear any previous errors
  
//       try {
//         const response = await fetch("/api/getLatestFirstForm");
//         const data = await response.json();
  
//         console.log("API Response:", data); // Debugging log
  
//         if (data.success && data.firstFormId) {
//           setId(data.firstFormId);
//           setRelatedData(Array.isArray(data.relatedData) ? data.relatedData : []);
//         } else {
//           setError("No form data found.");
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//         setError("Failed to fetch the latest form data.");
//       } finally {
//         setLoading(false); // Ensure loading is stopped after fetching
//       }
//     };
  
//     fetchLatestFirstForm();
//   }, []);

//   if (loading) {
//     return <div className="text-center p-4">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500 text-center p-4">{error}</div>;
//   }

//   return (
//     <div>
//       <Header />
//       <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Entry Details</h2>

//         <div className="mb-8">
//           <p className="text-lg">
//             <span className="font-semibold text-gray-700">API Endpoint:</span>{" "}
//             <span className="text-blue-600 break-all hover:text-blue-800 transition-colors">
//               http://localhost:3000/api/CreateId/{id}
//             </span>
//           </p>
//         </div>

//         {relatedData.length > 0 ? (
//           <div className="border-t pt-6">
//             <h3 className="text-xl font-semibold mb-4 text-gray-800">
//               Associated Entries
//             </h3>
//             <div className="space-y-4">
//               {relatedData.map((item) => (
//                 <div
//                   key={item._id}
//                   className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <p className="mb-2">
//                     <span className="font-medium text-gray-700">Name:</span>{" "}
//                     <span className="text-gray-600">{item.name}</span>
//                   </p>
//                   <p className="mb-2">
//                     <span className="font-medium text-gray-700">Email:</span>{" "}
//                     <a
//                       href={`mailto:${item.email}`}
//                       className="text-blue-600 hover:underline"
//                     >
//                       {item.email}
//                     </a>
//                   </p>
//                   <p>
//                     <span className="font-medium text-gray-700">Message:</span>{" "}
//                     <span className="text-gray-600">{item.message}</span>
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-6 text-gray-500">
//             No associated entries found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function CreateForm() {
  const [id, setId] = useState("");
  const [relatedData, setRelatedData] = useState<
    { _id: string; name: string; email: string; message: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLatestFirstForm = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/getLatestFirstForm");
        const data = await response.json();

        if (data.success && data.firstFormId) {
          setId(data.firstFormId);
          setRelatedData(Array.isArray(data.relatedData) ? data.relatedData : []);
        } else {
          setError("No form data found.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch the latest form data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestFirstForm();
  }, []);

  const handleDelete = async (itemId: string) => {
    try {
      const response = await fetch(`/api/deleteEntry`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId, collection: "secondformdatas" }), // Specify the collection
      });
  
      // Check if the response is valid
      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text for debugging
        console.error("Delete API error:", errorText);
        alert("Failed to delete the entry. Please try again.");
        return;
      }
  
      const data = await response.json(); // Parse the JSON response
  
      if (data.success) {
        // Remove the deleted item from the state
        setRelatedData((prevData) => prevData.filter((item) => item._id !== itemId));
      } else {
        alert(data.message || "Failed to delete the entry.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the entry.");
    }
  };
 
  
  

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Entry Details</h2>

        <div className="mb-8">
          <p className="text-lg">
            <span className="font-semibold text-gray-700">API Endpoint:</span>{" "}
            <span className="text-blue-600 break-all hover:text-blue-800 transition-colors">
              http://localhost:3000/api/CreateId/{id}
            </span>
          </p>
        </div>

        {relatedData.length > 0 ? (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Associated Entries
            </h3>
            <div className="space-y-4">
              {relatedData.map((item) => (
                <div
                  key={item._id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <p className="mb-2">
                    <span className="font-medium text-gray-700">Name:</span>{" "}
                    <span className="text-gray-600">{item.name}</span>
                  </p>
                  <p className="mb-2">
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    <a
                      href={`mailto:${item.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item.email}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Message:</span>{" "}
                    <span className="text-gray-600">{item.message}</span>
                  </p>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No associated entries found
          </div>
        )}
      </div>
    </div>
  );
}