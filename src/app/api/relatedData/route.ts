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



export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const firstFormId = searchParams.get("firstFormId");

    if (!firstFormId) {
      return NextResponse.json(
        { success: false, message: "firstFormId is required" },
        { status: 400 }
      );
    }

    // Fetch related data from SecondFormData collection
    const relatedData = await SecondFormData.find({ firstFormId }).select(
      "name email message"
    );

    return NextResponse.json({ success: true, records: relatedData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching related data:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
