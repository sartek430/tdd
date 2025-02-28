import { PrismaClient } from "@prisma/client";
import { openDb } from "../config/database";
import { User } from "../models/userModel";
import { query } from "express";

export class UserRepository {
  constructor() {}

  public async createUser(user: User): Promise<void> {
    const db = await openDb();
    try {
      await db.run(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        user.name,
        user.email,
        user.password
      );
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error);
    }
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const db = await openDb();
    const user = await db.get<User>(
      "SELECT name, email, password FROM users WHERE email = ?",
      [email]
    );
    return user || undefined;
  }

  public async getAllUsers(): Promise<void> {
    const prisma = new PrismaClient();
    const typeDefs = `
      type Query {
        allUsers: [User]
      }
      type User {
        username: String
        email: String
  }`;

    const resolver = {
      Query: {
        allUsers: async () => {
          return await prisma.user.findMany();
        },
      },
    };
  }
}
