import { Router } from "express";
import type { Request, Response } from "express";
const router: Router = Router();
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import "dotenv/config";
import { generateToken } from "../services/token.service.js";

const saltRounds = 10;

// Endpoint para crear usuario
router.post("/", async (req: Request, res: Response) => {
  try {
    const { username, name, email, password } = req.body;

    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    const createdUser = await prisma.user.create({
      data: {
        email,
        username,
        name,
        passwordHash: passwordHash,
      },
    });

    let token = generateToken({ userId: createdUser.id });

    res.cookie("recurrent", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
});

// Endpoint para eliminar usuario

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    if (!userId) {
      res.status(404).json({ error: "El usuario indicado no existe" });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(user?.id),
      },
    });
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});

export default router;
