import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants";
import cookie from "cookie";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const jwtSecret = process.env.JWT_SECRET!;
  const token = jwt.sign(payload, jwtSecret, { expiresIn });
  console.log(`Token created ${token}`);
  return token;
};

export const verifyToken = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies[COOKIE_NAME];

  if (!token || token.trim() === "") {
    console.log(`Starting verifying the token ${token}`);
    return res.status(401).json({ message: "Token not received" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Token expired" });
    } else {
      console.log("Token Verification Successful");

      next();
    }
  });
};
