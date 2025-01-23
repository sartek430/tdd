import { User } from "../models/userModel";
import { UserRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
    private secretKey: string | undefined = process.env.SECRET_KEY;
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async loginUser(user: User): Promise<string> {
        if (!this.secretKey) {
            throw new Error('Secret key not found');
        }

        try {
            const dbUser: User | undefined = await this.userRepository.getUserByEmail(user.email);
            if (!dbUser) {
                throw new Error('User not found');
            }

            if (bcrypt.compareSync(user.password, dbUser.password)) {
                return jwt.sign({ email: user.email }, this.secretKey, { expiresIn: '1h' });
            }

            throw new Error('Invalid credentials');
        } catch (error: any) {
            if (error.message === 'User not found' || error.message === 'Invalid credentials') {
                throw error;
            }
            throw new Error('Internal error');
        }
    }
}
