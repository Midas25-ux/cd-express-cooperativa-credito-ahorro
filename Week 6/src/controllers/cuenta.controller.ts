// ============================================
// CONTROLLER: Cuenta
// ============================================
import { Request, Response, NextFunction } from 'express';
import * as service from '../services/cuenta.service';
import {
  createCuentaSchema,
  updateCuentaSchema,
  objectIdSchema,
} from '../schemas/cuenta.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query['page']) || 1;
    const limit = Number(req.query['limit']) || 10;
    const search = req.query['search'] as string | undefined;
    const result = await service.getAll(page, limit, search);
    res.json(result);
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
    const dto = createCuentaSchema.parse(req.body);
    const item = await service.createCuenta(dto);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    const dto = updateCuentaSchema.parse(req.body);
    const item = await service.updateCuenta(id, dto);
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    await service.deleteCuenta(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
