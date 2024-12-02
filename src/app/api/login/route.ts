import { NextResponse } from "next/server";
import { connectDb, getDb } from "../../../components/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: any) {
  try {
    const { email, password } = await req.json();
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

    const user = await db.collection("user").findOne({ email: email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return NextResponse.json({ message: "Login success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
