import { Router } from 'express';
import { getUsers, getUser, getUsersPaginate } from '../controllers/UserController';

const router = Router();

router.get('/', getUsersPaginate);
router.get('/:id', getUser);

export default router;
