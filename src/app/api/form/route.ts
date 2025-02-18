import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import FirstFormData from "@/models/FirstFormData";

export async function POST(req: Request) {
  try {
    await connectDB(); 

    // Get the session and user ID
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const user_id = session.user.id; // Get the user_id from session
    const body = await req.json();
    const { name, email } = body; // Only name and email come from request

    if (!name || !email) {
      return NextResponse.json({ message: "Name and email are required." }, { status: 400 });
    }

    // Save form data with user_id
    const newEntry = await FirstFormData.create({ name, email, user_id });

    return NextResponse.json({
      message: "Data saved successfully!",
      id: newEntry._id.toString(), 
      name: newEntry.name,
      user_id: newEntry.user_id.toString(),
    }, { status: 201 });

  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
