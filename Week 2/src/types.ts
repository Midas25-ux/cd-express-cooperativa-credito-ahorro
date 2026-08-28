// ============================================
// TYPES: Interfaz del recurso principal
// ============================================


export interface Cuenta {
  id: number;
  titular: string;
  tipo: string; // "ahorro" | "credito" | "aportes" | "cdt"
  saldo: number;
  cupoDisponible: number;
  activa: boolean;
}


export type CreateCuentaDto = Omit<Cuenta, 'id'>;


export type UpdateCuentaDto = Partial<CreateCuentaDto>;
