// ============================================
// REPOSITORY — Capa de acceso a datos
// ============================================
// Única capa que accede al store.
// Todos los métodos son async.
// Se utilizan copias defensivas para no exponer
// directamente las referencias internas.

import {
  Cuenta,
  CreateCuentaDto,
  UpdateCuentaDto,
} from '../types';

// ============================================
// STORE
// ============================================

const store: Cuenta[] = [
  {
    id: 1,
    numeroCuenta: 'CTA-1001',
    titular: 'Carlos Rodríguez',
    tipo: 'ahorro',
    saldo: 2500000,
    activa: true,
    createdAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 2,
    numeroCuenta: 'CTA-1002',
    titular: 'María González',
    tipo: 'corriente',
    saldo: 4800000,
    activa: true,
    createdAt: '2026-08-02T11:00:00.000Z',
  },
  {
    id: 3,
    numeroCuenta: 'CTA-1003',
    titular: 'Andrés Martínez',
    tipo: 'ahorro',
    saldo: 1750000,
    activa: true,
    createdAt: '2026-08-03T09:30:00.000Z',
  },
  {
    id: 4,
    numeroCuenta: 'CTA-1004',
    titular: 'Laura Pérez',
    tipo: 'credito',
    saldo: 0,
    activa: false,
    createdAt: '2026-08-04T14:00:00.000Z',
  },
  {
    id: 5,
    numeroCuenta: 'CTA-1005',
    titular: 'Juan Torres',
    tipo: 'ahorro',
    saldo: 3200000,
    activa: true,
    createdAt: '2026-08-05T16:00:00.000Z',
  },
];

let nextId = 6;

// ============================================
// FIND ALL
// ============================================

export async function findAll(): Promise<Cuenta[]> {
  return store.map((cuenta) => ({ ...cuenta }));
}

// ============================================
// FIND BY ID
// ============================================

export async function findById(
  id: number,
): Promise<Cuenta | undefined> {
  const cuenta = store.find((item) => item.id === id);

  if (!cuenta) {
    return undefined;
  }

  return { ...cuenta };
}

// ============================================
// CREATE
// ============================================

export async function create(
  dto: CreateCuentaDto,
): Promise<Cuenta> {
  const cuenta: Cuenta = {
    id: nextId++,
    ...dto,
    createdAt: new Date().toISOString(),
  };

  store.push(cuenta);

  return { ...cuenta };
}

// ============================================
// UPDATE
// ============================================

export async function update(
  id: number,
  dto: UpdateCuentaDto,
): Promise<Cuenta | undefined> {
  const index = store.findIndex((item) => item.id === id);

  if (index === -1) {
    return undefined;
  }

  store[index] = {
    ...store[index]!,
    ...dto,
  };

  return { ...store[index]! };
}

// ============================================
// REMOVE
// ============================================

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((item) => item.id === id);

  if (index === -1) {
    return false;
  }

  store.splice(index, 1);

  return true;
}