// // app/api/formCount/route.ts
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { connectDB } from "@/lib/mongodb";
// import FirstFormData from "@/models/FirstFormData";


// // app/api/formCount/route.ts
// export async function GET() {
//   try {
//     await connectDB();
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     // Fetch forms with names and IDs
//     const forms = await FirstFormData.find(
//       { user_id: session.user.id },
//       { _id: 1, name: 1 } // Only get ID and name
//     ).lean();

//     return NextResponse.json({ 
//       success: true, 
//       formCount: forms.length,
//       forms 
//     });
//   } catch (error) {
//     console.error("Error fetching form count:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import FirstFormData from "@/models/FirstFormData";
import SecondFormData from "@/models/SecondFormData";
import mongoose, { Types } from "mongoose"; // Import Types for ObjectId

// Define TypeScript interfaces for MongoDB data
interface FirstForm {
  _id: Types.ObjectId;
  name: string;
}

interface SecondForm {
  firstFormId: Types.ObjectId;
  requestUrl: string;
}

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

    // Fetch FirstFormData for the logged-in user
    const firstForms: FirstForm[] = await FirstFormData.find(
      { user_id: new mongoose.Types.ObjectId(session.user.id) },
      { _id: 1, name: 1 } // Get only _id and name
    ).select('_id name').lean();

    if (!firstForms.length) {
      return NextResponse.json({
        success: true,
        formCount: 0,
        forms: [],
      });
    }

    // Extract form IDs from firstForms
    const formIds = firstForms.map((form) => form._id);

    // Fetch SecondFormData matching firstFormIds
    const secondForms: SecondForm[] = await SecondFormData.find(
      { firstFormId: { $in: formIds } },
      { firstFormId: 1, requestUrl: 1 }
    ).lean();

    console.log("Fetched SecondFormData:", secondForms); // Debugging

    // Create a mapping of firstFormId → unique requestUrls
    const formURLMap: Record<string, Set<string>> = {};
    secondForms.forEach((data) => {
      const formId = data.firstFormId.toString();
      if (!formURLMap[formId]) formURLMap[formId] = new Set();
      formURLMap[formId].add(data.requestUrl); // Ensures uniqueness
    });

    console.log("FormURLMap before conversion:", formURLMap); // Debugging

    // Merge requestUrls with firstForms
    const formsWithUrls = firstForms.map((form) => ({
      _id: form._id.toString(),
      name: form.name,
      requestURLs: Array.from(formURLMap[form._id.toString()] || []), // Convert Set to Array
    }));

    console.log("Final Mapped Forms:", formsWithUrls); // Debugging

    return NextResponse.json({
      success: true,
      formCount: firstForms.length,
      forms: formsWithUrls,
    });
  } catch (error) {
    console.error("Error fetching form data:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

