import type { Cuenta, CreateCuentaDto, UpdateCuentaDto } from './types.js';

// Store en memoria — simula una base de datos sin persistencia
// Los datos se pierden al reiniciar el servidor (se usará BD a partir de week-05)
const cuentas: Cuenta[] = [];
let nextId = 1;

export function getAll(): Cuenta[] {
  return cuentas;
}

export function getById(id: number): Cuenta | undefined {
  return cuentas.find((cuenta) => cuenta.id === id);
}

export function create(data: CreateCuentaDto): Cuenta {
  const newCuenta: Cuenta = { id: nextId++, ...data };
  cuentas.push(newCuenta);
  return newCuenta;
}

export function update(id: number, data: UpdateCuentaDto): Cuenta | undefined {
  const cuenta = cuentas.find((c) => c.id === id);
  if (!cuenta) {
    return undefined;
  }
  Object.assign(cuenta, data);
  return cuenta;
}

export function remove(id: number): boolean {
  const index = cuentas.findIndex((c) => c.id === id);
  if (index === -1) {
    return false;
  }
  cuentas.splice(index, 1);
  return true;
}
