import { connectDB } from "@/lib/mongodb";
import FirstFormData from "@/models/FirstFormData";
import SecondFormData from "@/models/SecondFormData";
import { NextResponse } from "next/server";

type DeleteRequestBody = {
  id: string;
  collection: string;
};

export async function DELETE(req: Request) {
  try {
    const body: DeleteRequestBody = await req.json();

    const { id, collection } = body;

    // Validate request body
    if (!id || !collection) {
      return NextResponse.json(
        { success: false, message: "ID and collection are required" },
        { status: 400 }
      );
    }

    // Validate collection name
    if (!["firstformdatas", "secondformdatas"].includes(collection)) {
      return NextResponse.json(
        { success: false, message: "Invalid collection name" },
        { status: 400 }
      );
    }

    await connectDB();

    let result;
    if (collection === "firstformdatas") {
      result = await FirstFormData.findByIdAndDelete(id);
    } else if (collection === "secondformdatas") {
      result = await SecondFormData.findByIdAndDelete(id);
    }

    if (result) {
      return NextResponse.json(
        { success: true, message: "Entry deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Entry not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}



