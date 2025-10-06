import { Router } from "express";
import {
  authenticateToken,
  authorizeRole,
} from "../middlewares/auth.middleware.js";
import ProtectedController from "../controllers/protected.controller.js";
import EventsController from "../controllers/events.controller.js";

const router = Router();

router.get("/dashboard", authenticateToken, ProtectedController.dashboard);
router.post("/dashboard/volunteer", authenticateToken, ProtectedController.volunteer);

router.get("/events/:id", authenticateToken,/* authorizeRole("admin"),*/ EventsController.show);
router.post("/events/:id", authenticateToken,/* authorizeRole("admin"),*/ EventsController.update);
router.delete("/events/:id", authenticateToken,/* authorizeRole("admin"),*/ EventsController.delete);

router.get("/admin", authenticateToken, authorizeRole("admin"), ProtectedController.adminOnly);

export default router;
