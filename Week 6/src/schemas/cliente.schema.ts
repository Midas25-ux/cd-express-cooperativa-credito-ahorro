// ============================================
// SCHEMA ZOD: Cliente
// ============================================
import { z } from 'zod';

export const createClienteSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido').max(100),
  documento: z.string().min(1, 'El documento es requerido').max(20),
  telefono: z.string().max(20).optional(),
  email: z.string().email('Email inválido').max(100).optional(),
});

export const updateClienteSchema = createClienteSchema.partial();

export type CreateClienteDto = z.infer<typeof createClienteSchema>;
export type UpdateClienteDto = z.infer<typeof updateClienteSchema>;
