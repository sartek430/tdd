import { openDb } from "../config/database";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/userRepository";

export class RegisterUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async registerUser(user: User): Promise<void> {
    if (
      !user.password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      )
    ) {
      throw new Error("Password not strong enough");
    }
    if (!user.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
      throw new Error("Invalid email");
    }
    user.password = await this.hashPassword(user.password);
    await this.userRepository.createUser(user);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Nombre de tours pour générer le sel
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}
