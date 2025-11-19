// src/controllers/restaurant.controller.ts

import { Request, Response } from 'express';
import { RestaurantService } from '../services/restaurant.service.js';
import { CreateRestaurantDTO, UpdateRestaurantDTO } from '../types/restaurant.types.js';

export class RestaurantController {
  static async getAll(req: Request, res: Response) {
    try {
      const restaurants = await RestaurantService.getAll();
      return res.status(200).json(restaurants);
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  }

  static async getById(req: Request<{ id: string }>, res: Response) {
    try {
      const restaurant = await RestaurantService.getById(req.params.id);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      return res.status(200).json(restaurant);
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  }

  static async create(req: Request<{}, {}, CreateRestaurantDTO>, res: Response) {
    try {
      const restaurant = await RestaurantService.create(req.body);
      return res.status(201).json(restaurant);
    } catch (err) {
      return res.status(400).json({ error: (err as Error).message });
    }
  }

  static async update(req: Request<{ id: string }, {}, UpdateRestaurantDTO>, res: Response) {
    try {
      const restaurant = await RestaurantService.update(req.params.id, req.body);
      return res.status(200).json(restaurant);
    } catch (err) {
      return res.status(400).json({ error: (err as Error).message });
    }
  }

  static async delete(req: Request<{ id: string }>, res: Response) {
    try {
      await RestaurantService.delete(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  }
}
