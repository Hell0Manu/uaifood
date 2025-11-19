// src/services/product.service.ts
import { prisma } from '../lib/prisma.js';
import { CreateProductDTO, UpdateProductDTO } from '../types/product.types.js';

export class ProductService {
  static async getAll() {
    return await prisma.product.findMany();
  }

  static async getById(id: string) {
    return await prisma.product.findUnique({ where: { id: parseInt(id) } });
  }

  static async create(data: CreateProductDTO) {
    return await prisma.product.create({ data });
  }

  static async update(id: string, data: UpdateProductDTO) {
    return await prisma.product.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  static async delete(id: string) {
    return await prisma.product.delete({ where: { id: parseInt(id) } });
  }
}
