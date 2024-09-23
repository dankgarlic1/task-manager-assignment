import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const jwtSecret = process.env.JWT_SECRET!;
  const token = jwt.sign(payload, jwtSecret, { expiresIn });

  console.log(`Token created ${token}`);
  return token;
};

export const verifyToken = async (token: string) => {
  try {
    const jwtSecret = process.env.JWT_SECRET!;

    const verified = jwt.verify(token, jwtSecret);
    return verified;
  } catch (error) {
    console.log(`error:${error}`);

    throw new Error("Invalid or expired token");
  }
};
