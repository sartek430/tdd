import { Request, Response } from "express";
import { RegisterUserService } from "../services/registerUserService";
import { User } from "../models/userModel";

export class UserController {
  private registerUserService: RegisterUserService;

  constructor() {
    this.registerUserService = new RegisterUserService();
  }

  public async registerUser(req: Request, res: Response): Promise<void> {
    const user: User = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    };

    try {
      await this.registerUserService.registerUser(user);
      res.status(201).send();
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}
