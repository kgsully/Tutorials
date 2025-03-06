import { Router } from 'express';
import { getUsers, getUserById, createUser } from '../handlers/users.handlers';

const router = Router();

// GET /api/users
router.get('/', getUsers);

// GET /api/users/123
router.get('/:id', getUserById);

// POST /api/users
router.post('/', createUser);

export default router;
