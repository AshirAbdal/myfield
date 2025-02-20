import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FirstFormData from "@/models/FirstFormData";
import SecondFormData from "@/models/SecondFormData";

export async function GET() {
  try {
    await connectDB();

    // Fetch the latest FirstFormData entry
    const latestFirstForm = await FirstFormData.findOne().sort({ createdAt: -1 });

    if (!latestFirstForm) {
      return NextResponse.json(
        { success: false, message: "No firstFormId found in database" },
        { status: 400 }
      );
    }

    // Fetch related records from SecondFormData using firstFormId
    const relatedData = await SecondFormData.find({ firstFormId: latestFirstForm._id })
      .select("name email message");

    return NextResponse.json(
      { success: true, firstFormId: latestFirstForm._id, relatedData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching latest form:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
