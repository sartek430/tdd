import express from "express";
import { authenticateToken, AuthenticatedRequest } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/hello', authenticateToken, (req: AuthenticatedRequest, res) => {
    if (req.user) {
        res.send(`Welcome ${req.user.name}`);
    } else {
        res.status(401).send('Unauthorized');
    }
});

export default router;
