import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import publicRoutes from "./routes/public.routes.js";
import protectedRoutes from "./routes/protected.routes.js";

const BASE_URL = "/api";

const app = express();

app.use(cors());
app.use(express.json());

app.use(`${BASE_URL}/auth`, authRoutes);
app.use(`${BASE_URL}/public`, publicRoutes);
app.use(`${BASE_URL}/protected`, protectedRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API está funcionando!" });
});

app.use((err, req, res, next) => {
  console.error("Erro:", err);
  res
    .status(500)
    .json({ error: "Erro interno do servidor", details: err.message });
});

export default app;
