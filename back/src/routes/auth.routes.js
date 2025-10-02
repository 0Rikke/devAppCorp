// src/routes/auth.routes.js

import { Router } from "express";
// Importa o controller responsável por gerenciar as ações de autenticação
import AuthController from "../controllers/auth.controller.js";

const router = Router();

// Rota POST /register: Cadastra um novo usuário
router.post("/register", AuthController.register);

// Rota POST /login: Autentica o usuário e retorna o token
router.post("/login", AuthController.login);

// Exporta o roteador para ser utilizado na aplicação
export default router;
