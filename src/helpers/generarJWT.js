import jwt from 'jsonwebtoken';

const generarJWT = (id) => {
    // Toma el ID del usuario y lo "firma" con tu secreto
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // La sesión dura 30 días
    });
};

export default generarJWT;