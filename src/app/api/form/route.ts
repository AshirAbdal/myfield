// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import FirstFormData from "@/models/FirstFormData";

// export async function POST(req: Request) {
//   try {
//     await connectDB(); // Ensure MongoDB connection

//     const body = await req.json(); // Parse the JSON body
//     const { name, email } = body;

//     // Validate request body
//     if (!name || !email) {
//       return NextResponse.json({ message: "Name and email are required." }, { status: 400 });
//     }

//     // Save data to the database
//     const newEntry = await FirstFormData.create({ name, email });
//     return NextResponse.json({ message: "Data saved successfully!", data: newEntry }, { status: 201 });
//   } catch (error) {
//     console.error("Error saving data:", error);
//     return NextResponse.json({ message: "Internal server error." }, { status: 500 });
//   }
// }

// export async function GET() {
//   return NextResponse.json({ message: "This is a POST-only endpoint." }, { status: 405 });
// }


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FirstFormData from "@/models/FirstFormData";

export async function POST(req: Request) {
  try {
    await connectDB(); // Ensure MongoDB connection

    const body = await req.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ message: "Name and email are required." }, { status: 400 });
    }

    // Save data to database
    const newEntry = await FirstFormData.create({ name, email });

    return NextResponse.json({
      message: "Data saved successfully!",
      id: newEntry._id.toString(), // Send ObjectId back
      name: newEntry.name,
    }, { status: 201 });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
