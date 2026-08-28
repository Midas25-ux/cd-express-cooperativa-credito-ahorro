// ============================================
// CONTROLLER — Interfaz HTTP
// ============================================
// Reglas:
// 1. Extraer
// 2. Llamar service
// 3. Responder
//
// No contiene lógica de negocio.

import {
  Request,
  Response,
  NextFunction,
} from 'express';

import * as service from '../services/cuentas.service';

import {
  CreateCuentaDto,
  UpdateCuentaDto,
  ErrorResponse,
} from '../types';

// ============================================
// GET ALL
// ============================================

export async function getAll(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // Paso 1 — extraer
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    // Paso 2 — llamar service
    const result = await service.findAll({
      page,
      limit,
    });

    // Paso 3 — responder
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// ============================================
// GET BY ID
// ============================================

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // Paso 1 — extraer
    const id = Number(req.params.id);

    // Paso 2 — llamar service
    const cuenta = await service.findById(id);

    // Paso 3 — responder
    if (!cuenta) {
      const response: ErrorResponse = {
        error: 'Not Found',
        message: `Cuenta ${id} not found`,
      };

      res.status(404).json(response);
      return;
    }

    res.json({
      data: cuenta,
    });
  } catch (err) {
    next(err);
  }
}

// ============================================
// CREATE
// ============================================

export async function create(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // Paso 1 — extraer
    const dto = req.body as CreateCuentaDto;

    // Paso 2 — llamar service
    const cuenta = await service.create(dto);

    // Paso 3 — responder
    res.status(201).json({
      data: cuenta,
    });
  } catch (err) {
    next(err);
  }
}

// ============================================
// UPDATE
// ============================================

export async function update(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // Paso 1 — extraer
    const id = Number(req.params.id);
    const dto = req.body as UpdateCuentaDto;

    // Paso 2 — llamar service
    const cuenta = await service.update(id, dto);

    // Paso 3 — responder
    if (!cuenta) {
      const response: ErrorResponse = {
        error: 'Not Found',
        message: `Cuenta ${id} not found`,
      };

      res.status(404).json(response);
      return;
    }

    // Paso 3 — responder
    res.json({
      data: cuenta,
    });
  } catch (err) {
    next(err);
  }
}

// ============================================
// DELETE
// ============================================

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // Paso 1 — extraer
    const id = Number(req.params.id);

    // Paso 2 — llamar service
    const removed = await service.remove(id);

    // Paso 3 — responder
    if (!removed) {
      const response: ErrorResponse = {
        error: 'Not Found',
        message: `Cuenta ${id} not found`,
      };

      res.status(404).json(response);
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}