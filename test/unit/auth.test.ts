import { AuthService } from '../../src/services/authService';
import { UserRepository } from '../../src/repositories/userRepository';
import { User } from '../../src/models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

jest.mock('../../src/repositories/userRepository');

const mockedUserRepository = new UserRepository() as jest.Mocked<UserRepository>;

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
        authService['userRepository'] = mockedUserRepository;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a token for valid credentials', async () => {
        const user: User = { email: 'test@example.com', password: 'password' };
        const dbUser: User = { email: 'test@example.com', password: bcrypt.hashSync('password', 10) };

        mockedUserRepository.getUserByEmail.mockResolvedValue(dbUser);

        const token = await authService.loginUser(user);

        expect(token).toBeDefined();
        expect(jwt.verify(token, process.env.SECRET_KEY as string)).toMatchObject({ email: user.email });
    });

    it('should throw an error for invalid credentials', async () => {
        const user: User = { email: 'test@example.com', password: 'wrongpassword' };
        const dbUser: User = { email: 'test@example.com', password: bcrypt.hashSync('password', 10) };

        mockedUserRepository.getUserByEmail.mockResolvedValue(dbUser);

        await expect(authService.loginUser(user)).rejects.toThrow('Invalid credentials');
    });

    it('should throw an error if user is not found', async () => {
        const user: User = { email: 'notfound@example.com', password: 'password' };

        mockedUserRepository.getUserByEmail.mockResolvedValue(undefined);

        await expect(authService.loginUser(user)).rejects.toThrow('User not found');
    });

});
