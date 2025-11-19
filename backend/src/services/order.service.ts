// src/services/order.service.ts
import { prisma } from '../lib/prisma.js';
import { CreateOrderDTO } from '../types/order.types.js';

export class OrderService {
  static async getAll() {
    return await prisma.order.findMany({
      include: {
        items: true,
      },
    });
  }

  static async getById(id: string) {
    return await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        items: true,
      },
    });
  }

  static async create(data: CreateOrderDTO, userId: number) {
    const { items, ...orderData } = data;
    return await prisma.order.create({
      data: {
        ...orderData,
        userId,
        items: {
          create: items,
        },
      },
      include: {
        items: true,
      },
    });
  }

  static async updateStatus(id: string, status: string) {
    return await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });
  }
}
