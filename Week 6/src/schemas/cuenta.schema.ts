// ============================================
// SCHEMA ZOD: Cuenta (con ref a Cliente)
// ============================================
import { z } from 'zod';

// ObjectId: 24 caracteres hexadecimales
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
export const objectIdSchema = z.string().regex(objectIdRegex, 'ID inválido');

export const createCuentaSchema = z.object({
  numeroCuenta: z.string().min(1, 'El número de cuenta es requerido').max(30),
  tipo: z.enum(['ahorros', 'corriente']),
  saldo: z.number().min(0),
  cupoDisponible: z.number().min(0).optional(),
  activa: z.boolean().optional(),
  cliente: z.string().regex(objectIdRegex, 'ID de cliente inválido'),
});

export const updateCuentaSchema = createCuentaSchema.partial();

export type CreateCuentaDto = z.infer<typeof createCuentaSchema>;
export type UpdateCuentaDto = z.infer<typeof updateCuentaSchema>;
