// ============================================
// MODELO: Cuenta (entidad principal, con referencia a Cliente)
// ============================================
import { Schema, model, Types } from 'mongoose';

interface ICuenta {
  numeroCuenta: string;
  tipo: 'ahorros' | 'corriente';
  saldo: number;
  cupoDisponible: number;
  activa: boolean;
  cliente: Types.ObjectId;
}

const cuentaSchema = new Schema<ICuenta>(
  {
    numeroCuenta: {
      type: String,
      required: [true, 'El número de cuenta es requerido'],
      trim: true,
      unique: true,
      maxlength: 30,
    },
    tipo: {
      type: String,
      enum: ['ahorros', 'corriente'],
      required: [true, 'El tipo de cuenta es requerido'],
    },
    saldo: {
      type: Number,
      required: [true, 'El saldo es requerido'],
      min: 0,
      default: 0,
    },
    cupoDisponible: {
      type: Number,
      min: 0,
      default: 0,
    },
    activa: {
      type: Boolean,
      default: true,
    },
    cliente: {
      type: Schema.Types.ObjectId,
      ref: 'Cliente',
      required: [true, 'La referencia al cliente es requerida'],
    },
  },
  { timestamps: true },
);

export const Cuenta = model<ICuenta>('Cuenta', cuentaSchema);
