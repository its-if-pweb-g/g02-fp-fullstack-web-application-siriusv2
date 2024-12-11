import { NextResponse } from "next/server";
import { verifyToken } from "../../../components/lib/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    if(decoded.role === "admin"){
      return NextResponse.json(
        { message: "Authenticated", user: decoded },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Unauthorized", user: decoded },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error during authentication check" },
      { status: 500 }
    );
  }
}
