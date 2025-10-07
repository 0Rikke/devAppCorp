import { Router } from "express";
import {
  authenticateToken,
  authorizeRole,
} from "../middlewares/auth.middleware.js";
import ProtectedController from "../controllers/protected.controller.js";
import EventsController from "../controllers/events.controller.js";
import UsersController from "../controllers/users.controller.js";

const router = Router();

router.get("/dashboard", authenticateToken, ProtectedController.dashboard);
router.post("/dashboard/volunteer", authenticateToken, ProtectedController.volunteer);

router.get("/events/:id", authenticateToken, authorizeRole("admin"), EventsController.show);
router.post("/events/:id", authenticateToken, authorizeRole("admin"), EventsController.update);
router.delete("/events/:id", authenticateToken, authorizeRole("admin"), EventsController.delete);

router.get("/volunteers", authenticateToken, authorizeRole("admin"), UsersController.index);
router.post("/volunteers", authenticateToken, authorizeRole("admin"), UsersController.create);
router.get("/volunteers/:id", authenticateToken, authorizeRole("admin"), UsersController.show);
router.post("/volunteers/:id", authenticateToken, authorizeRole("admin"), UsersController.update);
router.delete("/volunteers/:id", authenticateToken, authorizeRole("admin"), UsersController.delete);

router.get("/admin", authenticateToken, authorizeRole("admin"), ProtectedController.adminOnly);

export default router;
