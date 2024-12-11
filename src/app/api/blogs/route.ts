import { NextResponse } from "next/server";
import { connectDb, getDb } from "../../../components/lib/db";

export async function POST(req: any) {
  try {
    const { title, desc, content } = await req.json();

    if (!title || !desc || !content) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await new Promise((resolve: Function, reject: Function) => {
      connectDb((err) => {
        if (err) {
          reject("Error connecting to the database");
        } else {
          resolve();
        }
      });
    });

    const db = getDb();

    await db.collection("blogs").insertOne({
      title: title,
      description: desc,
      content: content,
    });

    return NextResponse.json({ message: "Blog Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
