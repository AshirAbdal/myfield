import bcrypt from "bcrypt";
import clientPromise from "../../../libs/mongo";

export async function POST(req) {
  const rawBody = await req.text();
  let body;

  try {
    body = JSON.parse(rawBody);
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid JSON" }), { status: 400 });
  }

  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const existingUser  = await db.collection("users").findOne({ email });
    if (existingUser ) {
      return new Response(JSON.stringify({ message: "User  already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({ name, email, password: hashedPassword, createdAt: new Date() });

    return new Response(JSON.stringify({ message: "User  created successfully" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}