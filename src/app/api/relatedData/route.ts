// app/api/relatedData/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SecondFormData from "@/models/SecondFormData";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const requestUrl = searchParams.get("requestUrl");

    if (!requestUrl) {
      return NextResponse.json(
        { success: false, message: "Missing request URL" },
        { status: 400 }
      );
    }

    const relatedRecords = await SecondFormData.find({ requestUrl });
    
    return NextResponse.json({
      success: true,
      records: relatedRecords
    });

  } catch (error) {
    console.error("Error fetching related data:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}