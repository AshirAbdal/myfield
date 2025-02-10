
import { NextResponse } from "next/server";
import clientPromise from "../../libs/mongo";


// export async function GET() {
//     return NextResponse.json({

//             products:[

//                {

//                      id: 1,
//                 name: "ravee"

//                },
//             ],
//         });
    
// }



// export async function POST(request: Request) {
//     const data = await request.json();
    
//     // Console log the data
//     console.log(data);

//     return NextResponse.json({
//         data,
//     });
// }



export async function OPTIONS() {
  return NextResponse.json({}, { 
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
}

// export async function POST(request: Request) {
//   try {
//     // Determine content type
//     const contentType = request.headers.get("content-type") || "*";

//     let data;
//     if (contentType.includes("application/json")) {
//       data = await request.json();
//     } else if (
//       contentType.includes("multipart/form-data") ||
//       contentType.includes("application/x-www-form-urlencoded")
//     ) {
//       const formData = await request.formData();
//       data = {
//         name: formData.get("name"),
//         email: formData.get("email"),
//         message: formData.get("message"),
//       };
//     } else {
//       return new Response("Unsupported Media Type", { status: 415 });
//     }

//     console.log("Received data:", data);

   

//     return new Response(JSON.stringify({ data }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type",
//       },
//     });

//   } catch (error) {
//     console.error("Error processing request:", error);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }



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
    const client = await clientPromise;
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




export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("myfield");
    const collection = db.collection("fromdata");

    
    const data = await collection.find({}).toArray();

    return NextResponse.json({ products: data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data from database:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
