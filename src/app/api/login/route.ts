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

    const jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ email: user.email, id: user._id }, jwt_secret, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      { message: "Login success" },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
