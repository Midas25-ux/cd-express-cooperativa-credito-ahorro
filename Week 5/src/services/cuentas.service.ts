// src/services/cuentas.service.ts — Lógica de negocio
import { Prisma } from '@prisma/client';
import * as repo from '../repositories/cuentas.repository';
import { AppError } from '../errors/AppError';

export async function listItems(page: number, limit: number) {
  return repo.findAll(page, limit);
}

export async function getItem(id: string) {
  const item = await repo.findById(id);
  if (!item) throw new AppError(404, 'Cuenta no encontrada');
  return item;
}

export async function createItem(data: Prisma.CuentaUncheckedCreateInput) {
  return repo.create(data);
}

export async function updateItem(id: string, data: Prisma.CuentaUncheckedUpdateInput) {
  return repo.update(id, data);
}

export async function deleteItem(id: string): Promise<void> {
  await repo.remove(id);
}
