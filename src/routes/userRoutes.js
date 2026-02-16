import express from 'express';
import { registrarUsuario, perfil, autenticarUsuario } from '../controllers/userControllers.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Cuando alguien entre a '/'
router.post('/', registrarUsuario); // Si es POST -> Crea usuario
router.post('/login', autenticarUsuario); // Si es POST -> Autentica usuario

// Rutas Privadas (Solo con Token)
router.get('/perfil', checkAuth, perfil);

export default router;