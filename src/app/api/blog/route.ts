import { NextResponse } from "next/server";
import { connectDb, getDb } from "@/components/lib/db";

async function connectDatabase() {
  return new Promise((resolve, reject) => {
    connectDb((err) => {
      if (err) {
        reject("Error connecting to the database");
      } else {
        resolve(undefined);
      }
    });
  });
}

// Handler untuk GET dan POST
export async function GET() {
  try {
    await connectDatabase();
    const db = getDb();
    const blogs = await db
      .collection("blogs")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error || "Error fetching blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, desc, content } = await req.json();

    if (!title || !desc || !content) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDatabase();
    const db = getDb();

    await db.collection("blogs").insertOne({
      title,
      description: desc,
      content,
    });

    return NextResponse.json({ message: "Blog Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error || "Error creating blog" },
      { status: 500 }
    );
  }
}
