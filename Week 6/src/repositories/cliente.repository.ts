// ============================================
// REPOSITORY: Cliente
// ============================================
import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';
import { Cliente } from '../models/cliente.model';
import { AppError } from '../errors/AppError';
import type { CreateClienteDto, UpdateClienteDto } from '../schemas/cliente.schema';

export async function findAll(): Promise<unknown[]> {
  return Cliente.find().sort({ nombre: 1 }).lean();
}

export async function findById(id: string): Promise<unknown> {
  try {
    const cliente = await Cliente.findById(id).lean();
    if (!cliente) {
      throw new AppError(404, 'Cliente no encontrado');
    }
    return cliente;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}

export async function create(dto: CreateClienteDto): Promise<unknown> {
  try {
    const cliente = await Cliente.create(dto);
    return cliente.toJSON();
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe un cliente con ese documento');
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateClienteDto): Promise<unknown> {
  try {
    const cliente = await Cliente.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    }).lean();
    if (!cliente) {
      throw new AppError(404, 'Cliente no encontrado');
    }
    return cliente;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe un cliente con ese documento');
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const cliente = await Cliente.findByIdAndDelete(id).lean();
    if (!cliente) {
      throw new AppError(404, 'Cliente no encontrado');
    }
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}
