import jwt from "jsonwebtoken";

const SECRET_KEY = "shhh_secret_key";

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
};