import { Router } from "express";
import {
  authenticateToken,
  authorizeRole,
} from "../middlewares/auth.middleware.js";
import ProtectedController from "../controllers/protected.controller.js";

const router = Router();

router.get("/dashboard", authenticateToken, ProtectedController.dashboard);

router.get(
  "/admin",
  authenticateToken,
  authorizeRole("admin"),
  ProtectedController.adminOnly
);

export default router;
