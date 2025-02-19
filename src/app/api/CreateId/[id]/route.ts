import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FirstFormData from "@/models/FirstFormData";
import SecondFormData from "@/models/SecondFormData"; 

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;

    
    const data = await FirstFormData.findById(id);

    if (!data) {
      return NextResponse.json({ success: false, message: "Data not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      name: data.name,
      id: data._id.toString(), 
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
  
      let data;
      const contentType = request.headers.get("content-type");
  
      if (contentType?.includes("application/json")) {
        data = await request.json();
      } else if (
        contentType?.includes("multipart/form-data") ||
        contentType?.includes("application/x-www-form-urlencoded")
      ) {
        const formData = await request.formData();
        data = {
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        };
      } else if (searchParams.has("name") && searchParams.has("email") && searchParams.has("message")) {
        data = {
          name: searchParams.get("name"),
          email: searchParams.get("email"),
          message: searchParams.get("message"),
        };
      } else {
        return new Response("Unsupported Media Type", { status: 415 });
      }
  
      
      data.requestUrl = request.url;
  
      console.log("Final Data being saved:", data); 
  
      await connectDB();
      const result = await SecondFormData.create(data);
  
      console.log("Saved Data:", result); 
  
      return new Response(JSON.stringify({ success: true, data: result }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    } catch (error) {
      console.error("Error processing request:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
  
  
  