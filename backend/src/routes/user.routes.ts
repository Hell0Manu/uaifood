// src/routes/user.routes.ts

import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const router = Router();

router.post("/", UserController.create);

export default router;