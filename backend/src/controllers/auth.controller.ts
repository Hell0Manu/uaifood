// src/controllers/auth.controller.ts

import { Request, Response } from 'express';
import { UserService } from "../services/user.service.js";
import { AuthService } from '../services/auth.service.js';
import { CreateUserDTO, LoginDTO } from '../types/user.types.js';

export class AuthController {
  static async register(req: Request<{}, {}, CreateUserDTO>, res: Response) {
    try {
      const user = await UserService.create(req.body);

      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: (err as Error).message });
    }
  }

  static async login(req: Request<{}, {}, LoginDTO>, res: Response) {
    try {
      const { token } = await AuthService.login(req.body);
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(401).json({ error: (err as Error).message });
    }
  }

  static async refresh(req: Request<{}, {}, { token: string }>, res: Response) {
    try {
      const { token } = req.body;
      const newToken = await AuthService.refresh(token);
      return res.status(200).json(newToken);
    }
    catch (err) {
      return res.status(401).json({ error: (err as Error).message });
    }
  }
}
