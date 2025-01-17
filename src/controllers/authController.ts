import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { Login } from "../models/loginModel";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async loginUser(req: Request, res: Response): Promise<void> {
    const user: Login = {
      email: req.body.email,
      password: req.body.password,
    };

    try {
      const token = await this.authService.loginUser();
      res.status(200).send(token);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}
