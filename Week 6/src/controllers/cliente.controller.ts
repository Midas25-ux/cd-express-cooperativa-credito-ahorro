// ============================================
// CONTROLLER: Cliente
// ============================================
import { Request, Response, NextFunction } from 'express';
import * as service from '../services/cliente.service';
import {
  createClienteSchema,
  updateClienteSchema,
} from '../schemas/cliente.schema';
import { objectIdSchema } from '../schemas/cuenta.schema';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await service.getAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    const item = await service.getById(id);
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createClienteSchema.parse(req.body);
    const item = await service.createCliente(dto);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    const dto = updateClienteSchema.parse(req.body);
    const item = await service.updateCliente(id, dto);
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    await service.deleteCliente(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
