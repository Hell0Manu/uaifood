// src/routes/restaurant.routes.ts

import { Router } from "express";
import { RestaurantController } from "../controllers/restaurant.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", RestaurantController.getAll);
router.get("/:id", RestaurantController.getById);
router.post("/", authMiddleware, RestaurantController.create);
router.patch("/:id", authMiddleware, RestaurantController.update);
router.delete("/:id", authMiddleware, RestaurantController.delete);

export default router;