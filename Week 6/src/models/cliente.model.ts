// ============================================
// MODELO: Cliente (entidad secundaria, sin referencias)
// ============================================
import { Schema, model } from 'mongoose';

interface ICliente {
  nombre: string;
  documento: string;
  telefono?: string;
  email?: string;
}

const clienteSchema = new Schema<ICliente>(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
      maxlength: 100,
    },
    documento: {
      type: String,
      required: [true, 'El documento es requerido'],
      trim: true,
      unique: true,
      maxlength: 20,
    },
    telefono: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 100,
    },
  },
  { timestamps: true },
);

export const Cliente = model<ICliente>('Cliente', clienteSchema);
