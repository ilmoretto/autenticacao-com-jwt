import { Router } from 'express';
import { getUsuarios, postDados } from '../controllers/protected.controller.js';

const router = Router();

router.get('/usuarios', getUsuarios);
router.post('/dados', postDados);

export default router;