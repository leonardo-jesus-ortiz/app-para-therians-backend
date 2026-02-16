import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const checkAuth = async (req, res, next) => {
    let token;

    // 1. Buscamos si viene el token en los headers (Authorization: Bearer <token>)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // 2. Limpiamos el token (sacamos la palabra "Bearer ")
            token = req.headers.authorization.split(' ')[1];

            // 3. Verificamos la firma con tu palabra secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Buscamos al usuario en la BD y lo guardamos en la sesión (menos el password)
            req.usuario = await User.findById(decoded.id).select('-password');

            return next(); // ¡Pase, caballero! 🚪
            
        } catch (error) {
            return res.status(404).json({ msg: 'Hubo un error con el token 🚫' });
        }
    }

    // Si no mandó token...
    if (!token) {
        const error = new Error('Token no válido o inexistente');
        return res.status(401).json({ msg: error.message });
    }
};

export default checkAuth;