import jwt from "jsonwebtoken";
import "dotenv/config";
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";

const secret = process.env.JWT_SECRET;

export const authProtection = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.recurrent;

  if (!token) {
    return res.status(401).json({ error: "No tienes ningun token activo" });
  }
  if (!secret) {
    return res.status(500).json({ error: "Ha ocurrido un fallo inesperado" });
  }
  try {
    const user = jwt.verify(token, secret);

    if (typeof user !== "object" || user === null || !("userId" in user)) {
      return res.status(401).json({ error: "Token inválido" });
    }

    if (typeof user.userId !== "number") {
      return res.status(401).json({ error: "Token inválido" });
    }

    const userId = user.userId;

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token caducado" });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Token invalido." });
    }
  }
  next();
};

export default authProtection;
