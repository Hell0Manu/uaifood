// src/repositories/user.repository.ts

import prisma from "../lib/prisma.js";
import type { Prisma } from "../../generated/prisma/index.js"; 

export class UserRepository {
  static async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}