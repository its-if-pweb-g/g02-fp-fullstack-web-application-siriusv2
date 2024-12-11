import jwt from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET;
if (!jwt_secret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, jwt_secret);
  } catch {
    return null;
  }
};
