import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { User } from "../models/userModel";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async loginUser(req: Request, res: Response): Promise<void> {
        const user: User = {
            email: req.body.email,
            password: req.body.password,
        };

        try {
            const token = await this.authService.loginUser(user);
            res.status(200).send({ token });
        } catch (error: any) {
            if (error.message === 'User not found' || error.message === 'Invalid credentials') {
                res.status(401).send({ message: error.message });
                return;
            }
            res.status(500).send({ message: 'Internal error' });
        }
    }
}
