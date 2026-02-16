import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // <--- 1. NUEVO: Importar esto

const userSchema = mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    theriotype: { type: String, default: "Desconocido" },
    esAdmin: { type: Boolean, default: false }
}, {
    timestamps: true
});

// --- 2. NUEVO: BLOQUE DE ENCRIPTACIÓN ---
userSchema.pre('save', async function (next) {
    // Si no se modificó la password, no hacemos nada
    if (!this.isModified('password')) {
        next();
    }
    // Generamos el hash (encriptación)
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// --- 3. NUEVO: MÉTODO PARA COMPARAR (Lo usaremos en el Login) ---
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;