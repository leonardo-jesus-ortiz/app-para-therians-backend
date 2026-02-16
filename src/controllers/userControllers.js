import User from '../models/User.js';
import generarJWT from '../helpers/generarJWT.js';

// @desc    Registrar un nuevo usuario
// @route   POST /api/users
export const registrarUsuario = async (req, res) => {
    try {
        // Recibimos los datos que manda tu compañera desde el Front
        const { nombre, email, password, theriotype } = req.body;

        // Validamos si ya existe el email
        const usuarioExiste = await User.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ msg: 'Ese usuario ya existe 🚫' });
        }

        // Creamos el usuario
        const usuario = new User({ nombre, email, password, theriotype });
        
        // Guardamos en MongoDB
        const usuarioAlmacenado = await usuario.save();

        res.json(usuarioAlmacenado); // Le devolvemos los datos al Front

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor ☠️' });
    }
};

export const obtenerUsuarios = async (req, res) => {
    const usuarios = await User.find(); // Busca todos en la BD
    res.json(usuarios);
};

export const autenticarUsuario = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await User.findOne({ email });

    if (usuario && (await usuario.matchPassword(password))) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            theriotype: usuario.theriotype,
            token: generarJWT(usuario._id), // <--- 3. AGREGAR TOKEN AL LOGIN
            mensaje: "¡Login Exitoso! 🐺"
        });
    } else {
        res.status(401).json({ msg: 'Email o contraseña incorrectos 🚫' });
    }
};

export const perfil = async (req, res) => {
    const { usuario } = req;
    res.json(usuario); // Devolvemos al usuario que ya encontró el middleware
};