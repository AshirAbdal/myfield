import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FirstFormData from "@/models/FirstFormData";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;

    // Fetch data from MongoDB
    const data = await FirstFormData.findById(id);

    if (!data) {
      return NextResponse.json({ success: false, message: "Data not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      name: data.name,
      id: data._id.toString(), // Convert ObjectId to string
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
