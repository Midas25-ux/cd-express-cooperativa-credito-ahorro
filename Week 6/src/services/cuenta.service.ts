// ============================================
// SERVICE: Cuenta
// ============================================
import * as repo from '../repositories/cuenta.repository';
import type { CreateCuentaDto, UpdateCuentaDto } from '../schemas/cuenta.schema';

export async function getAll(page: number, limit: number, search?: string) {
  return repo.findAll(page, limit, search);
}

export async function getById(id: string) {
  return repo.findById(id);
}

export async function createCuenta(dto: CreateCuentaDto) {
  return repo.create(dto);
}

export async function updateCuenta(id: string, dto: UpdateCuentaDto) {
  return repo.update(id, dto);
}

export async function deleteCuenta(id: string) {
  return repo.remove(id);
}
