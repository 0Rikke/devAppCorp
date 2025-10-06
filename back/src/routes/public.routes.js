// src/routes/public.routes.js

import { Router } from "express";
// Importa o controller responsável por lidar com rotas públicas
import PublicController from "../controllers/public.controller.js";
import EventsController from "../controllers/events.controller.js";

const router = Router();

// Rota GET /home: Rota pública de boas-vindas
router.get("/home", PublicController.home);
router.get("/events", EventsController.events);

// Exporta o roteador configurado
export default router;
