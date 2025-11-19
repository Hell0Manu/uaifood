// src/routes/order.routes.ts

import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, OrderController.getAll);
router.get("/:id", authMiddleware, OrderController.getById);
router.post("/", authMiddleware, OrderController.create);
router.patch("/:id/status", authMiddleware, OrderController.updateStatus);

export default router;