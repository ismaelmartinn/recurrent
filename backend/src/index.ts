import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import registerRoute from "./routes/register.routes.js";
import loginRoute from "./routes/login.routes.js";
import dashboardRoute from "./routes/dashboard.routes.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import { authProtection } from "./middlewares/auth.middleware.js";

const app = express();
const port = process.env.PORT || 3001;
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth/register", registerRoute);
app.use("/auth/", loginRoute);
app.use("/auth/me", dashboardRoute);
app.get("/", (req, res) => {
  res.status(200).json({ mensaje: "Backend de recurrent en funcionamiento" });
});

app.listen(port, () => {
  console.log("El servidor esta funcionando en el puerto", port);
  console.log(`La url http://127.0.0.1:${port}`);
});
