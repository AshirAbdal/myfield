// import { notFound } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { connectDB } from "@/lib/mongodb";
// import FirstFormData from "@/models/FirstFormData";
// import { ObjectId } from "mongodb"; // Import ObjectId

// export default async function FormDetailPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   await connectDB();
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.id) {
//     return notFound();
//   }

//   try {
//     const form = await FirstFormData.findOne({
//       _id: new ObjectId(params.id), // Convert string ID to ObjectId
//       user_id: session.user.id,
//     });

//     if (!form) {
//       return notFound();
//     }

//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6">{form.name}</h1>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <pre>{JSON.stringify(form, null, 2)}</pre>
//         </div>
//       </div>
//     );
//   } catch (error) {
//     console.error("Error fetching form data:", error);
//     return notFound(); // If invalid ObjectId, return 404
//   }
// }
