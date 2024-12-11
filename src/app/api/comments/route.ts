import { NextRequest, NextResponse } from "next/server";
import { connectDb, getDb } from "../../../components/lib/db";

async function connectToDb() {
    await new Promise((resolve: Function, reject: Function) => {
      connectDb((err) => {
        if (err) {
          reject("Error connecting to the database");
        } else {
          resolve();
        }
      });
    });
}

export async function GET(req: NextRequest) {
  try {
    const blogTitle = req.nextUrl.searchParams.get("blog_title");
    if (!blogTitle) {
      return NextResponse.json({ error: "Missing blog_title parameter" }, { status: 400 });
    }

    await connectToDb();
    const db = getDb();

    const comments = await db
      .collection("comments")
      .find({ blog_title: blogTitle })
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { blog_title, username, comment } = body;

    if (!blog_title || !username || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDb();
    const db = getDb();

    const newComment = {
      blog_title,
      username,
      comment,
      created_at: new Date(Date.now()).toISOString().split(".")[0] + "Z",
    };

    const result = await db.collection("comments").insertOne(newComment);

    if (result.insertedId) {
      return NextResponse.json({ success: true, comment: newComment }, { status: 201 });
    } else {
      throw new Error("Failed to insert comment");
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}