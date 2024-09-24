import { jwtVerify, SignJWT } from "jose";

export const createToken = async (
  id: string,
  email: string,
  expiresIn: string
) => {
  const payload = { id, email };
  const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(jwtSecret);

  console.log(`Token created ${token}`);
  return token;
};

export const verifyToken = async (token: string) => {
  try {
    // const jwtSecret = process.env.JWT_SECRET!;
    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET!);

    const { payload } = await jwtVerify(token, jwtSecret);
    console.log("Verified Payload:", payload);

    return { payload, token };
  } catch (error) {
    console.log(`error:${error}`);

    throw new Error("Invalid or expired token");
  }
};
