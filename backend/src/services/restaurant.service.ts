// src/services/restaurant.service.ts
import { prisma } from '../lib/prisma.js';
import { CreateRestaurantDTO, UpdateRestaurantDTO } from '../types/restaurant.types.js';

export class RestaurantService {
  static async getAll() {
    return await prisma.restaurant.findMany();
  }

  static async getById(id: string) {
    return await prisma.restaurant.findUnique({ where: { id: parseInt(id) } });
  }

  static async create(data: CreateRestaurantDTO) {
    return await prisma.restaurant.create({ data });
  }

  static async update(id: string, data: UpdateRestaurantDTO) {
    return await prisma.restaurant.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  static async delete(id: string) {
    return await prisma.restaurant.delete({ where: { id: parseInt(id) } });
  }
}
