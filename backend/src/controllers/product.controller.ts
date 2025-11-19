// src/controllers/product.controller.ts

import { Request, Response } from 'express';
import { ProductService } from '../services/product.service.js';
import { CreateProductDTO, UpdateProductDTO } from '../types/product.types.js';

export class ProductController {
  static async getAll(req: Request, res: Response) {
    try {
      const products = await ProductService.getAll();
      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  }

  static async getById(req: Request<{ id: string }>, res: Response) {
    try {
      const product = await ProductService.getById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  }

  static async create(req: Request<{}, {}, CreateProductDTO>, res: Response) {
    try {
      const product = await ProductService.create(req.body);
      return res.status(201).json(product);
    } catch (err) {
      return res.status(400).json({ error: (err as Error).message });
    }
  }

  static async update(req: Request<{ id: string }, {}, UpdateProductDTO>, res: Response) {
    try {
      const product = await ProductService.update(req.params.id, req.body);
      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).json({ error: (err as Error).message });
    }
  }

  static async delete(req: Request<{ id: string }>, res: Response) {
    try {
      await ProductService.delete(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  }
}
