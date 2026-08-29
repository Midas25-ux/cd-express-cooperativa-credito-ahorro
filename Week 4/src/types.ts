// ============================================
// TYPES — entidad Cuenta y tipos de respuesta genéricos
// ============================================

export type TipoCuenta = 'ahorro' | 'corriente';

export interface Cuenta {
  id: number;
  titular: string;
  tipo: TipoCuenta;
  saldo: number;
  cupoDisponible: number;
  activa: boolean;
  createdAt: Date;
}

export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ValidationErrorResponse {
  error: string;
  message: string;
  issues: Array<{ field: string; message: string }>;
}

export interface ErrorResponse {
  error: string;
  message: string;
  stack?: string;
}
