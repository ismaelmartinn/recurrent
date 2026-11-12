import jwt from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.JWT_SECRET;
const JWT_EXPIRY = "1d";

export const generateToken = (payload: Object): String => {
  if (!secret) {
    throw new Error("JWT_SECRET no está definido");
  }
  return jwt.sign(payload, secret, {
    expiresIn: JWT_EXPIRY,
  });
};

export const verifyToken = (token: string): any => {
  if (!token) {
    throw new Error("Debes indicar el token");
  }
  if (!secret) {
    throw new Error("JWT_SECRET no está definido");
  }
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error(error);
  }
};
