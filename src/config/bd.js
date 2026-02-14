import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // Intenta conectar usando la URL del archivo .env
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`✅ Base de Datos Conectada: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error de conexión: ${error.message}`);
        process.exit(1); // Detiene el servidor si no hay base de datos
    }
};