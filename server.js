import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// 1. Configuración
dotenv.config();
connectDB(); // Conectamos a la BD

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middlewares (Importante para que el Front te pueda mandar JSON)
app.use(cors());
app.use(express.json());

// 3. Rutas de prueba
app.get('/', (req, res) => {
    res.send('API App Therians funcionando 🐺✨');
});

// AQUI IMPORTARÁS TUS RUTAS LUEGO:
// import userRoutes from './routes/userRoutes.js';
// app.use('/api/users', userRoutes);

// 4. Iniciar Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});