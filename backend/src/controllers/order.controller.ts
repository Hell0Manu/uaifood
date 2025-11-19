// src/controllers/order.controller.ts

import { Request, Response } from 'express';
import { OrderService } from '../services/order.service.js';
import { CreateOrderDTO } from '../types/order.types.js';

export class OrderController {
  static async getAll(req: Request, res: Response) {
    try {
      const orders = await OrderService.getAll();
      return res.status(200).json(orders);
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  }

  static async getById(req: Request<{ id: string }>, res: Response) {
    try {
      const order = await OrderService.getById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      return res.status(200).json(order);
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  }

  static async create(req: Request<{}, {}, CreateOrderDTO>, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
      const order = await OrderService.create(req.body, req.userId);
      return res.status(201).json(order);
    } catch (err) {
      return res.status(400).json({ error: (err as Error).message });
    }
  }

  static async updateStatus(req: Request<{ id: string }, {}, { status: string }>, res: Response) {
    try {
      const { status } = req.body;
      const order = await OrderService.updateStatus(req.params.id, status);
      return res.status(200).json(order);
    } catch (err) {
      return res.status(400).json({ error: (err as Error).message });
    }
  }
}
