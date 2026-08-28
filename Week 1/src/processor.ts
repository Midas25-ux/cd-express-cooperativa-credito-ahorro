// ============================================
// PROCESSOR — Filtra y calcula estadísticas
// ============================================
import type { Cuenta, CuentaSummary } from './types.js';

export function filterByCategory(
  items: Cuenta[],
  categoryFilter: string | null
): Cuenta[] {
  if (categoryFilter === null) {
    return items;
  }

  const filtered = items.filter(
    (item) => item.tipo.toLowerCase() === categoryFilter.toLowerCase()
  );

  if (filtered.length === 0) {
    const available = Array.from(new Set(items.map((item) => item.tipo)));
    throw new Error(
      `No hay cuentas con el tipo "${categoryFilter}". Tipos disponibles: ${available.join(', ')}`
    );
  }

  return filtered;
}

export function calculateSummary(items: Cuenta[]): CuentaSummary {
  const total = items.length;
  const active = items.filter((item) => item.activa).length;
  const inactive = items.filter((item) => !item.activa).length;

  const sumaSaldos = items.reduce((acc, item) => acc + item.saldo, 0);
  const averagePrice = Math.round((sumaSaldos / total) * 100) / 100;

  const sorted = [...items].sort((a, b) => a.saldo - b.saldo);
  const cheapest = sorted[0]!;
  const mostExpensive = sorted[sorted.length - 1]!;

  const categories = Array.from(new Set(items.map((item) => item.tipo)));

  return {
    total,
    active,
    inactive,
    averagePrice,
    mostExpensive,
    cheapest,
    categories,
  };
}
