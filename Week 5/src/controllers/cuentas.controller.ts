// src/controllers/cuentas.controller.ts — Capa HTTP
import { Request, Response, NextFunction } from 'express';
import * as service from '../services/cuentas.service';
import { createItemSchema, updateItemSchema } from '../schemas/cuentas.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, Number(req.query['page']) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query['limit']) || 10));
    const result = await service.listItems(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await service.getItem(req.params['id'] as string);
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = createItemSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        status: 'error',
        message: 'Datos de entrada inválidos',
        issues: result.error.issues.map((issue) => ({
          field: issue.path.join('.') || 'root',
          message: issue.message,
        })),
      });
      return;
    }
    const item = await service.createItem(result.data);
    res.status(201).json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = updateItemSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        status: 'error',
        message: 'Datos de entrada inválidos',
        issues: result.error.issues.map((issue) => ({
          field: issue.path.join('.') || 'root',
          message: issue.message,
        })),
      });
      return;
    }
    const item = await service.updateItem(req.params['id'] as string, result.data);
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await service.deleteItem(req.params['id'] as string);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
