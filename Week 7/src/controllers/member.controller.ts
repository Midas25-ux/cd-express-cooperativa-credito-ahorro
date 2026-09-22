import { Request, Response, NextFunction } from 'express';
import * as socioService from '../services/member.service';
import { createSocioSchema, updateSocioSchema } from '../schemas/member.schema';

export async function getAll(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const socios = await socioService.getAll();
    res.status(200).json(socios);
  } catch (err) {
    next(err);
  }
}

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const socio = await socioService.getById(String(req.params.id));
    res.status(200).json(socio);
  } catch (err) {
    next(err);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const dto = createSocioSchema.parse(req.body);
    const userId = req.user!.sub;
    const socio = await socioService.create(dto, userId);
    res.status(201).json(socio);
  } catch (err) {
    next(err);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const dto = updateSocioSchema.parse(req.body);
    const socio = await socioService.update(String(req.params.id), dto);
    res.status(200).json(socio);
  } catch (err) {
    next(err);
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await socioService.remove(String(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
