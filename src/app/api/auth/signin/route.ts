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

  const { email, password } = body;

  if (!email || !password) {
    return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "No user found" }), { status: 400 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ message: "Invalid password" }), { status: 400 });
    }

    // Here you can set a session or token for the user
    return new Response(JSON.stringify({ message: "Login successful", user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}