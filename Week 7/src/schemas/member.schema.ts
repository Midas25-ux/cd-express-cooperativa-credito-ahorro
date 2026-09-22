import { z } from 'zod';

/**
 * Tipos de cuenta disponibles en la Cooperativa de Ahorro y Crédito.
 *  - ahorro:       cuenta de ahorro ordinario
 *  - aportaciones: aportaciones de capital social del socio
 *  - credito:      socio habilitado para línea de crédito
 */
export const tipoCuentaEnum = ['ahorro', 'aportaciones', 'credito'] as const;

export const createSocioSchema = z.object({
  fullName: z
    .string()
    .min(3, 'El nombre completo debe tener al menos 3 caracteres')
    .trim(),
  cedula: z
    .string()
    .min(6, 'La cédula debe tener al menos 6 caracteres')
    .trim(),
  tipoCuenta: z.enum(tipoCuentaEnum, {
    error: 'El tipo de cuenta debe ser ahorro, aportaciones o credito',
  }),
  saldoAhorro: z
    .number({ error: 'El saldo de ahorro debe ser un número' })
    .min(0, 'El saldo de ahorro no puede ser negativo')
    .default(0),
  limiteCredito: z
    .number({ error: 'El límite de crédito debe ser un número' })
    .min(0, 'El límite de crédito no puede ser negativo')
    .default(0),
  cuotaPagada: z.boolean().default(false),
  phone: z.string().trim().optional(),
  active: z.boolean().default(true),
});

export const updateSocioSchema = createSocioSchema.partial();

export type CreateSocioDto = z.infer<typeof createSocioSchema>;
export type UpdateSocioDto = z.infer<typeof updateSocioSchema>;

// Re-export aliases so existing imports of CreateMemberDto / UpdateMemberDto still work
export type CreateMemberDto = CreateSocioDto;
export type UpdateMemberDto = UpdateSocioDto;
