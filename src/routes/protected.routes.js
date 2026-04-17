import { Router } from 'express';
import { getUsuarios, postDados } from '../controllers/protected.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/usuarios', authenticate, authorize('admin', 'moderador'), getUsuarios);
router.post('/dados', authenticate, authorize('admin', 'usuario', 'moderador'), postDados);

export default router;