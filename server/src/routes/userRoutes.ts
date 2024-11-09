import { Router } from 'express';
import { register, login, getUsers } from '../controllers/userController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticateJWT, getUsers);

export default router;