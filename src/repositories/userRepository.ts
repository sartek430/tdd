import { openDb } from "../config/database";
import { User } from "../models/userModel";

export class UserRepository {
  constructor() {}

  public async createUser(user: User): Promise<void> {
    const db = await openDb();
    await db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      user.name,
      user.email,
      user.password
    );
  }
}
