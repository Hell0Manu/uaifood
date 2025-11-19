// src/services/auth.service.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { LoginDTO } from '../types/user.types.js';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

const JWT_SECRET = process.env.JWT_SECRET;

export class AuthService {
  static async login(data: LoginDTO) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    return { token };
  }

  static async refresh(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      const newToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, { expiresIn: '1h' });
      return { token: newToken };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
