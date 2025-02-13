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



export async function POST(request: Request) {
    try {
      const contentType = request.headers.get("content-type") || "*";
      let data;
  
      // Parse the incoming request data based on its content type
      if (contentType.includes("application/json")) {
        data = await request.json();
      } else if (
        contentType.includes("multipart/form-data") ||
        contentType.includes("application/x-www-form-urlencoded")
      ) {
        const formData = await request.formData();
        data = {
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        };
      } else {
        return new Response("Unsupported Media Type", { status: 415 });
      }
  
      console.log("Received data:", data);
  
      // Connect to MongoDB
      const client = await connectDB();
      const db = client.db("myfield");
      const collection = db.collection("fromdata");
  
      // Insert the received data into the database
      const result = await collection.insertOne(data);
      console.log("Data saved to database:", result);
  
      // Return a success response
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
  
      // Return an error response
      return new Response("Internal Server Error", { status: 500 });
    }
  }
  
