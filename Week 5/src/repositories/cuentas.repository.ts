// src/repositories/cuentas.repository.ts — Acceso a datos con Prisma
import { Cuenta, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';

export interface PaginatedCuentas {
  data: Cuenta[];
  total: number;
  page: number;
  limit: number;
}

export async function findAll(page: number, limit: number): Promise<PaginatedCuentas> {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.cuenta.findMany({
      skip,
      take: limit,
      include: { cliente: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.cuenta.count(),
  ]);

  return { data, total, page, limit };
}

export async function findById(id: string): Promise<Cuenta | null> {
  return prisma.cuenta.findUnique({
    where: { id },
    include: { cliente: true },
  });
}

export async function create(data: Prisma.CuentaUncheckedCreateInput): Promise<Cuenta> {
  try {
    return await prisma.cuenta.create({ data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new AppError(409, 'Ya existe una cuenta con ese número');
    }
    throw err;
  }
}

export async function update(
  id: string,
  data: Prisma.CuentaUncheckedUpdateInput
): Promise<Cuenta> {
  try {
    return await prisma.cuenta.update({ where: { id }, data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2025') throw new AppError(404, 'Cuenta no encontrada');
      if (err.code === 'P2002') throw new AppError(409, 'Ya existe una cuenta con ese número');
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    await prisma.cuenta.delete({ where: { id } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, 'Cuenta no encontrada');
    }
    throw err;
  }
}
