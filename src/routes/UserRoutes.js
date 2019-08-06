import { Router } from 'express';
import { validateToken } from '../middlewares/authorization';
import { getUsers, getUser, getUsersPaginate, createUser, login, updateUser, deleteUser } from '../controllers/UserController';

const router = Router();

router.get('/', validateToken, getUsers);
router.get('/:id', validateToken, getUser);
router.post('/register', createUser);
router.post('/login', login);
router.put('/', updateUser);
router.delete('/:id', deleteUser);

export default router;
