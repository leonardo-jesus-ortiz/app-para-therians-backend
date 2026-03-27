import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    // Datos obligatorios
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, trim: true }, 
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    
    // Nuevos campos del registro de la Axis App
    fechaNac: { type: String }, 
    pais: { type: String, trim: true },
    ciudad: { type: String, trim: true },
    comunidad: { type: String },
    orientacion: { type: String },
    busca: { type: String },
    bio: { type: String, trim: true },
    intereses: [{ type: String }], // Array para guardar múltiples opciones
    
    // Datos extra
    theriotype: { type: String, default: "Desconocido" },
    esAdmin: { type: Boolean, default: false }
}, {
    timestamps: true
});

// --- BLOQUE DE ENCRIPTACIÓN (Intacto) ---
userSchema.pre('save', async function (next) {
    // Si no se modificó la password, no hacemos nada
    if (!this.isModified('password')) {
        next();
    }
    // Generamos el hash (encriptación)
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// --- MÉTODO PARA COMPARAR (Intacto) ---
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;