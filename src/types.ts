// ============================================
// TIPOS — Adapta estas interfaces a tu dominio
// ============================================


export interface Cuenta {
  id: string;
  titular: string;
  tipo: string;
  saldo: number;
  cupoDisponible: number;
  activa: boolean;
}

// Resumen que el procesador debe calcular
export interface CuentaSummary {
  total: number;
  active: number;
  inactive: number;
  averagePrice: number;
  mostExpensive: Cuenta;
  cheapest: Cuenta;
  categories: string[];
}

// Reporte final que se escribirá en output/report.json
export interface Report {
  generatedAt: string;
  appliedFilter: string | null;
  summary: CuentaSummary;
  items: Cuenta[];
}
