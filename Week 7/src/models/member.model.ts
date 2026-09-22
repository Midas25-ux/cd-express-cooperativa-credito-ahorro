import mongoose, { Document, Schema } from 'mongoose';

/**
 * Socio de la Cooperativa de Ahorro y Crédito.
 *
 * Tipos de cuenta:
 *  - ahorro:         cuenta de ahorro ordinario
 *  - aportaciones:   cuenta de aportaciones de capital social
 *  - credito:        socio habilitado para línea de crédito
 */
export interface ISocio extends Document {
  /** Nombre completo del socio */
  fullName: string;
  /** Número de cédula / documento de identidad (único) */
  cedula: string;
  /** Tipo de cuenta en la cooperativa */
  tipoCuenta: 'ahorro' | 'aportaciones' | 'credito';
  /** Saldo actual en la cuenta de ahorro (USD) */
  saldoAhorro: number;
  /** Límite de crédito aprobado (USD); 0 si no tiene crédito activo */
  limiteCredito: number;
  /** Indica si la cuota de membresía del período vigente está pagada */
  cuotaPagada: boolean;
  /** Teléfono de contacto (opcional) */
  phone?: string;
  /** Si el socio está activo en la cooperativa */
  active: boolean;
  /** Usuario que registró al socio */
  registradoPor: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const socioSchema = new Schema<ISocio>(
  {
    fullName: {
      type: String,
      required: [true, 'El nombre completo es requerido'],
      trim: true,
    },
    cedula: {
      type: String,
      required: [true, 'La cédula es requerida'],
      unique: true,
      trim: true,
    },
    tipoCuenta: {
      type: String,
      enum: ['ahorro', 'aportaciones', 'credito'],
      required: [true, 'El tipo de cuenta es requerido'],
    },
    saldoAhorro: {
      type: Number,
      required: [true, 'El saldo de ahorro es requerido'],
      min: [0, 'El saldo de ahorro no puede ser negativo'],
      default: 0,
    },
    limiteCredito: {
      type: Number,
      min: [0, 'El límite de crédito no puede ser negativo'],
      default: 0,
    },
    cuotaPagada: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    registradoPor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const SocioModel = mongoose.model<ISocio>('Socio', socioSchema);
