// app/api/formCount/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import FirstFormData from "@/models/FirstFormData";

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get the user session
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch form count for the logged-in user
    const formCount = await FirstFormData.countDocuments({ user_id: session.user.id });

    return NextResponse.json({ success: true, formCount });
  } catch (error) {
    console.error("Error fetching form count:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
