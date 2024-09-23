import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants";
import cookie from "cookie";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const jwtSecret = process.env.JWT_SECRET!;
  const token = jwt.sign(payload, jwtSecret, { expiresIn });
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }

  console.log(`Token created ${token}`);
  return token;
};

export const verifyToken = (req: NextApiRequest, res: NextApiResponse) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token not provided" });
    return null; // Return null to indicate failure
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Decoded Token:", decoded);
    return decoded; // Return the decoded payload
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
    return null; // Return null to indicate failure
  }
};
