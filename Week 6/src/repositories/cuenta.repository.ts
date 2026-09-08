// ============================================
// REPOSITORY: Cuenta (con populate)
// ============================================
import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';
import { Cuenta } from '../models/cuenta.model';
import { AppError } from '../errors/AppError';
import type { CreateCuentaDto, UpdateCuentaDto } from '../schemas/cuenta.schema';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export async function findAll(
  page: number,
  limit: number,
  search?: string,
): Promise<PaginatedResult<unknown>> {
  const skip = (page - 1) * limit;
  const filter = search ? { numeroCuenta: { $regex: search, $options: 'i' } } : {};

  const [data, total] = await Promise.all([
    Cuenta.find(filter)
      .populate('cliente')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Cuenta.countDocuments(filter),
  ]);

  return { data, total, page, totalPages: Math.ceil(total / limit) };
}

export async function findById(id: string): Promise<unknown> {
  try {
    const cuenta = await Cuenta.findById(id).populate('cliente').lean();
    if (!cuenta) {
      throw new AppError(404, 'Cuenta no encontrada');
    }
    return cuenta;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}

export async function create(dto: CreateCuentaDto): Promise<unknown> {
  try {
    const cuenta = await Cuenta.create(dto);
    return cuenta.toJSON();
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe una cuenta con ese número');
    }
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de cliente inválido');
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateCuentaDto): Promise<unknown> {
  try {
    const cuenta = await Cuenta.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    })
      .populate('cliente')
      .lean();
    if (!cuenta) {
      throw new AppError(404, 'Cuenta no encontrada');
    }
    return cuenta;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe una cuenta con ese número');
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const cuenta = await Cuenta.findByIdAndDelete(id).lean();
    if (!cuenta) {
      throw new AppError(404, 'Cuenta no encontrada');
    }
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}
