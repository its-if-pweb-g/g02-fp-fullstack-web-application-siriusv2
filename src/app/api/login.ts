import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {connectDb, getDb} from "../../components/lib/db";
import cookie from "cookie";

const SECRET_KEY = "Temporary_key";

let db: any = null;

connectDb((err) => {
  if (!err) {
    const db = getDb();
  }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const user = await db.collection("users").findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "20m" }
    );

    // Set the token in a cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 20 * 60, // 20 minutes
        path: "/",
      })
    );

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
