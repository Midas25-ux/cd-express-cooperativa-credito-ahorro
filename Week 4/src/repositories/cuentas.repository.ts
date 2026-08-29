// ============================================
// REPOSITORY — capa de acceso a datos (en memoria)
// ============================================
import { Cuenta } from '../types';

export type CreateCuentaRepoDto = Omit<Cuenta, 'id' | 'createdAt'>;
export type UpdateCuentaRepoDto = Partial<CreateCuentaRepoDto>;

let cuentas: Cuenta[] = [
  {
    id: 1,
    titular: 'Ana María Rojas',
    tipo: 'ahorro',
    saldo: 1_250_000,
    cupoDisponible: 0,
    activa: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    titular: 'Carlos Peña',
    tipo: 'corriente',
    saldo: 3_400_000,
    cupoDisponible: 500_000,
    activa: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    titular: 'Lucía Fernández',
    tipo: 'ahorro',
    saldo: 0,
    cupoDisponible: 0,
    activa: false,
    createdAt: new Date(),
  },
];
let nextId = 4;

export async function findAll(): Promise<Cuenta[]> {
  return cuentas.map((c) => ({ ...c }));
}

export async function findById(id: number): Promise<Cuenta | undefined> {
  const cuenta = cuentas.find((c) => c.id === id);
  return cuenta ? { ...cuenta } : undefined;
}

export async function create(dto: CreateCuentaRepoDto): Promise<Cuenta> {
  const cuenta: Cuenta = { id: nextId++, ...dto, createdAt: new Date() };
  cuentas.push(cuenta);
  return { ...cuenta };
}

export async function update(
  id: number,
  dto: UpdateCuentaRepoDto
): Promise<Cuenta | undefined> {
  const index = cuentas.findIndex((c) => c.id === id);
  if (index === -1) return undefined;
  cuentas[index] = { ...cuentas[index]!, ...dto };
  return { ...cuentas[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = cuentas.findIndex((c) => c.id === id);
  if (index === -1) return false;
  cuentas.splice(index, 1);
  return true;
}
