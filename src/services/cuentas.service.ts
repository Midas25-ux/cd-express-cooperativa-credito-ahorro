// ============================================
// SERVICE — Lógica de negocio
// ============================================
// No utiliza Express.
// Se comunica con el repository.
// Contiene paginación y validaciones de dominio.

import {
  CreateCuentaDto,
  UpdateCuentaDto,
  Cuenta,
  PaginatedResponse,
  PaginationParams,
} from '../types';

import * as repo from '../repositories/cuentas.repository';

// ============================================
// FIND ALL — PAGINACIÓN
// ============================================

export async function findAll(
  params: PaginationParams,
): Promise<PaginatedResponse<Cuenta>> {
  const { page, limit } = params;

  const all = await repo.findAll();

  const start = (page - 1) * limit;

  const data = all.slice(start, start + limit);

  return {
    data,
    total: all.length,
    page,
    limit,
  };
}

// ============================================
// FIND BY ID
// ============================================

export async function findById(
  id: number,
): Promise<Cuenta | undefined> {
  return repo.findById(id);
}

// ============================================
// CREATE
// ============================================

export async function create(
  dto: CreateCuentaDto,
): Promise<Cuenta> {
  // Validación de negocio:
  // el saldo inicial no puede ser negativo.

  if (dto.saldo < 0) {
    throw new Error('El saldo no puede ser negativo');
  }

  // Validación de tipo de cuenta.

  const tiposValidos = ['ahorro', 'corriente', 'credito'];

  if (!tiposValidos.includes(dto.tipo)) {
    throw new Error('El tipo de cuenta no es válido');
  }

  return repo.create(dto);
}

// ============================================
// UPDATE
// ============================================

export async function update(
  id: number,
  dto: UpdateCuentaDto,
): Promise<Cuenta | undefined> {
  const exists = await repo.findById(id);

  if (!exists) {
    return undefined;
  }

  if (dto.saldo !== undefined && dto.saldo < 0) {
    throw new Error('El saldo no puede ser negativo');
  }

  if (dto.tipo !== undefined) {
    const tiposValidos = ['ahorro', 'corriente', 'credito'];

    if (!tiposValidos.includes(dto.tipo)) {
      throw new Error('El tipo de cuenta no es válido');
    }
  }

  return repo.update(id, dto);
}

// ============================================
// REMOVE
// ============================================

export async function remove(id: number): Promise<boolean> {
  const exists = await repo.findById(id);

  if (!exists) {
    return false;
  }

  return repo.remove(id);
}