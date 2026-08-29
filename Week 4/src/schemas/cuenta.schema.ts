// ============================================
// SCHEMAS — Cuenta (Cooperativa de Crédito y Ahorro)
// ============================================
import { z } from 'zod';

export const tipoCuentaEnum = z.enum(['ahorro', 'corriente'], {
  errorMap: () => ({ message: 'tipo debe ser "ahorro" o "corriente"' }),
});

export const createItemSchema = z.object({
  titular: z
    .string({ required_error: 'titular es obligatorio' })
    .min(3, 'titular debe tener al menos 3 caracteres')
    .trim(),
  tipo: tipoCuentaEnum,
  saldo: z
    .number({ required_error: 'saldo es obligatorio' })
    .nonnegative('saldo no puede ser negativo')
    .default(0),
  cupoDisponible: z
    .number()
    .nonnegative('cupoDisponible no puede ser negativo')
    .default(0),
  activa: z.boolean().default(true),
});

// Reutiliza el schema de creación con .partial() para actualizaciones parciales
export const updateItemSchema = createItemSchema.partial();

// Tipos inferidos — single source of truth
export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
