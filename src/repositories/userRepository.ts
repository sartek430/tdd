import { openDb } from "../config/database";
import { User } from "../models/userModel";

export class UserRepository {
    constructor() { }

    public async createUser(user: User): Promise<void> {
        const db = await openDb();
        await db.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            user.name,
            user.email,
            user.password
        );
    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        const db = await openDb();
        const user = await db.get<User>('SELECT name, email, password FROM users WHERE email = ?', [email]);
        return user || undefined;
    }
}
