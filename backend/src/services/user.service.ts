// src/services/user.service.ts

import { CreateUserDTO, UserWithoutPassword } from "../types/user.types.js";
import { UserRepository } from "../repositories/user.repository.js";
import bcrypt from "bcryptjs"; 

export class UserService {
  static async create({ 
    email, 
    password, 
    name, 
    phone, 
    role 
  }: CreateUserDTO): Promise<UserWithoutPassword> {
    

    const exists = await UserRepository.findByEmail(email);
    if (exists) {
      throw new Error("E-mail já cadastrado.");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await UserRepository.create({
      email,
      password: hashed,
      name,
      phone,
      role: role || 'CLIENT', 
    });

    const { password: _, ...userWithoutPassword } = user;
    
    return userWithoutPassword as UserWithoutPassword;
  }
}