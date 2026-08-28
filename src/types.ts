// ============================================
// TYPES — Dominio: Cooperativa de Crédito y Ahorro
// ============================================

export type TipoCuenta = 'ahorro' | 'corriente' | 'credito';

export interface Cuenta {
  id: number;
  numeroCuenta: string;
  titular: string;
  tipo: TipoCuenta;
  saldo: number;
  activa: boolean;
  createdAt: string;
}

// DTO para crear.
// id y createdAt son generados automáticamente.
export type CreateCuentaDto = Omit<Cuenta, 'id' | 'createdAt'>;

// DTO para actualizar.
// Todos los campos son opcionales.
export type UpdateCuentaDto = Partial<CreateCuentaDto>;

// ============================================
// CONTRATOS DE RESPUESTA
// ============================================

export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}