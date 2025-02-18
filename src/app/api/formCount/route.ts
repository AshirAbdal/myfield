// app/api/formCount/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import FirstFormData from "@/models/FirstFormData";


// app/api/formCount/route.ts
export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch forms with names and IDs
    const forms = await FirstFormData.find(
      { user_id: session.user.id },
      { _id: 1, name: 1 } // Only get ID and name
    ).lean();

    return NextResponse.json({ 
      success: true, 
      formCount: forms.length,
      forms 
    });
  } catch (error) {
    console.error("Error fetching form count:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
