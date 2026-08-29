// src/schemas/cuentas.schema.ts — Validación Zod para Cuenta
import { z } from 'zod';

export const createItemSchema = z.object({
  numeroCuenta: z
    .string()
    .min(6, 'numeroCuenta debe tener al menos 6 caracteres')
    .max(20),
  tipo: z.enum(['AHORRO', 'CORRIENTE'], {
    errorMap: () => ({ message: 'tipo debe ser "AHORRO" o "CORRIENTE"' }),
  }),
  saldo: z.number().nonnegative('saldo no puede ser negativo').default(0),
  cupoDisponible: z
    .number()
    .nonnegative('cupoDisponible no puede ser negativo')
    .default(0),
  activa: z.boolean().default(true),
  clienteId: z.string().uuid('clienteId debe ser un UUID válido'),
});

export const updateItemSchema = createItemSchema.partial();

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
