import { Router } from "express";
import type { Request, Response } from "express";
const router: Router = Router();
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import { generateToken } from "../services/token.service.js";
import jwt from "jsonwebtoken";

// Endpoint para logear usuario
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Los campos email y contraseña son obligatorios." });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: false,
        passwordHash: true,
        isDemo: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "El usuario no existe" });
    }

    const returnUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      isDemo: user.isDemo,
    };

    const comparedPasswords = await bcrypt.compare(password, user.passwordHash);

    if (comparedPasswords) {
      let token = generateToken({ userId: user.id });

      res.cookie("recurrent", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json(returnUser);
    } else {
      return res.status(401).json({ error: "La contraseña no coincide" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al acceder el usuario" });
  }
});

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("recurrent", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Sesión cerrada" });
});

export default router;
