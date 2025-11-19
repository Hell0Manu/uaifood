// src/controllers/user.controller.ts

import { Request, Response } from 'express';
import { UserService } from "../services/user.service.js";
import { CreateUserDTO } from '../types/user.types.js';

export class UserController {
  static async create(req: Request<{}, {}, CreateUserDTO>, res: Response) {
    try {
      const user = await UserService.create(req.body); 
      
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: (err as Error).message });
    }
  }
}