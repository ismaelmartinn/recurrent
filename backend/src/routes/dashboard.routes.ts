import { Router } from "express";
import type { Request, Response } from "express";
const router: Router = Router();
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

// Obtener info del usuario y su token
router.get("/", async (req: Request, res: Response) => {
  // Obtener token de la cookie
  try {
    const token = req.cookies?.recurrent;
    console.log("Cookies:", req.cookies);
    console.log("Token:", req.cookies?.recurrent);
    if (!token) {
      return res.status(401).json({ error: "No hay sesión activa" });
    }

    if (!secret) {
      return res
        .status(401)
        .json({ error: "No se a podido comprobar el token" });
    }

    interface JwtPayload {
      userId: number;
    }
    const tokenVerified = jwt.verify(token, secret) as JwtPayload;

    const userId = tokenVerified.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        name: false,
        passwordHash: false,
        isDemo: true,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expirado" });
    }

    if (error instanceof jwt.NotBeforeError) {
      return res.status(401).json({ error: "Token todavía no válido" });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Token inválido" });
    }

    return res.status(500).json({ error: "Error interno" });
  }
});

export default router;
