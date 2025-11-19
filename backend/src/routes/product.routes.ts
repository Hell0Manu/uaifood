// src/routes/product.routes.ts

import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.post("/", authMiddleware, ProductController.create);
router.patch("/:id", authMiddleware, ProductController.update);
router.delete("/:id", authMiddleware, ProductController.delete);

export default router;