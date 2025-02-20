import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FirstFormData from "@/models/FirstFormData";
import SecondFormData from "@/models/SecondFormData";


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

    const relatedData = await SecondFormData.find({ firstFormId });

    return NextResponse.json({ success: true, records: relatedData });
  } catch (error) {
    console.error("Error fetching related data:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}




export async function POST(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    let data: { 
      name?: string; 
      email?: string; 
      message?: string; 
      requestUrl?: string 
    } = {};

    const contentType = request.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await request.json();
    } else if (
      contentType?.includes("multipart/form-data") ||
      contentType?.includes("application/x-www-form-urlencoded")
    ) {
      const formData = await request.formData();
      data = {
        name: formData.get("name") as string | undefined,
        email: formData.get("email") as string | undefined,
        message: formData.get("message") as string | undefined,
      };
    } else {
      data = {
        name: searchParams.get("name") || undefined,
        email: searchParams.get("email") || undefined,
        message: searchParams.get("message") || undefined,
      };
    }

    //  Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    // Fetch the latest firstFormId from the database
    const latestFirstForm = await FirstFormData.findOne().sort({ createdAt: -1 });
    if (!latestFirstForm) {
      return NextResponse.json({ success: false, message: "No firstFormId found in database" }, { status: 400 });
    }
    const firstFormId = latestFirstForm._id;

    // Assign request URL
    data.requestUrl = request.url;

    console.log("Saving Data:", { ...data, firstFormId });

    // Save the document with auto-fetched firstFormId
    const result = await SecondFormData.create({
      name: data.name,
      email: data.email,
      message: data.message,
      requestUrl: data.requestUrl,
      firstFormId: firstFormId, 
    });

    return NextResponse.json({ success: true, data: result }, { status: 200 });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

