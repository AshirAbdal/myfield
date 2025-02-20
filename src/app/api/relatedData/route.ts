// app/api/relatedData/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SecondFormData from "@/models/SecondFormData";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, message, requestUrl, firstFormId } = await req.json();

    if (!name || !email || !message || !requestUrl || !firstFormId) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const newRecord = await SecondFormData.create({
      name,
      email,
      message,
      requestUrl,
      firstFormId, // Save reference
    });

    return NextResponse.json({
      success: true,
      message: "Record saved successfully!",
      record: newRecord,
    });
  } catch (error) {
    console.error("Error saving related data:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
