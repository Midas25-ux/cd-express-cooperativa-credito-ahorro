// ============================================
// SERVICE — lógica de negocio del dominio Cuenta
// ============================================
import * as repository from '../repositories/cuentas.repository';
import { AppError } from '../errors/AppError';
import { Cuenta, PaginatedResponse } from '../types';
import { CreateItemDto, UpdateItemDto } from '../schemas/cuenta.schema';

interface PaginationParams {
  page: number;
  limit: number;
}

export async function findAll(
  params: PaginationParams
): Promise<PaginatedResponse<Cuenta>> {
  const page = Math.max(1, params.page);
  const limit = Math.max(1, params.limit);

  const all = await repository.findAll();
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);

  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Cuenta> {
  const cuenta = await repository.findById(id);
  if (!cuenta) {
    throw new AppError(404, `Cuenta con id ${id} no encontrada`);
  }
  return cuenta;
}

export async function create(dto: CreateItemDto): Promise<Cuenta> {
  return repository.create({
    titular: dto.titular,
    tipo: dto.tipo,
    saldo: dto.saldo ?? 0,
    cupoDisponible: dto.cupoDisponible ?? 0,
    activa: dto.activa ?? true,
  });
}

export async function update(id: number, dto: UpdateItemDto): Promise<Cuenta> {
  // Asegura que la cuenta exista antes de intentar actualizar
  await findById(id);
  const updated = await repository.update(id, dto);
  if (!updated) {
    throw new AppError(404, `Cuenta con id ${id} no encontrada`);
  }
  return updated;
}

export async function remove(id: number): Promise<void> {
  const deleted = await repository.remove(id);
  if (!deleted) {
    throw new AppError(404, `Cuenta con id ${id} no encontrada`);
  }
}
