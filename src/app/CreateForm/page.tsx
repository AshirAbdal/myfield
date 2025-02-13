// "use client";

// import { useEffect, useState } from "react";
// import Header from "../components/Header";

// export default function CreateForm() {
//   const [name, setName] = useState("");
//   const [id, setId] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Get the last inserted ID from localStorage
//     const storedId = localStorage.getItem("lastInsertedId");

//     if (!storedId) {
//       setLoading(false);
//       return;
//     }

//     setId(storedId);

//     // Fetch name from API using stored ID
//     fetch(`/api/CreateId/${storedId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setName(data.name);
//         }
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Header />
//       <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-xl font-bold mb-4">Entry Details</h2>
//         <p><strong>Name:</strong> {name}</p>
//         <p>
//           <strong>API Endpoint:</strong>{" "}
//           <span className="text-blue-600 cursor-pointer select-all">
//             http://localhost:3000/api/CreateId/{id}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function CreateForm() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedId = localStorage.getItem("lastInsertedId");

    if (!storedId) {
      setLoading(false);
      return;
    }

    setId(storedId);

    // Fetch name from API using stored ID
    fetch(`/api/CreateId/${storedId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setName(data.name);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // ✅ Send request URL to the database
    fetch(`/api/CreateId/${storedId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestUrl: `http://localhost:3000/api/CreateId/${storedId}` }),
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Entry Details</h2>
        <p><strong>Name:</strong> {name}</p>
        <p>
          <strong>API Endpoint:</strong>{" "}
          <span className="text-blue-600 cursor-pointer select-all">
            http://localhost:3000/api/CreateId/{id}
          </span>
        </p>
      </div>
    </div>
  );
}
