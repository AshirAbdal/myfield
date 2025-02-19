// app/api/form/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import FirstFormData from "@/models/FirstFormData";

export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ message: "Name and email are required." }, { status: 400 });
    }

    const newForm = await FirstFormData.create({
      name,
      email,
      user_id: session.user.id, // Add the user_id from session
    });

    return NextResponse.json({ message: "Form saved successfully!", id: newForm._id }, { status: 201 });
  } catch (error) {
    console.error("Error saving form:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
