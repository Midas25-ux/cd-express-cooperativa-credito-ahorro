import { Router } from 'express';
import * as store from '../store.js';
import type { CreateCuentaDto, UpdateCuentaDto } from '../types.js';

export const cuentasRouter = Router();

// GET /cuentas — Listar todos los recursos
// Status: 200
cuentasRouter.get('/', (_req, res) => {
  res.status(200).json(store.getAll());
});

// GET /cuentas/:id — Obtener recurso por ID
// Status: 200 si existe | 404 si no existe
cuentasRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const cuenta = store.getById(id);

  if (!cuenta) {
    res.status(404).json({ error: 'Cuenta no encontrada' });
    return;
  }

  res.status(200).json(cuenta);
});

// POST /cuentas — Crear nuevo recurso
// Status: 201 con el recurso creado
cuentasRouter.post('/', (req, res) => {
  const dto = req.body as CreateCuentaDto;
  const nuevaCuenta = store.create(dto);
  res.status(201).json(nuevaCuenta);
});

// PUT /cuentas/:id — Actualizar recurso completo
// Status: 200 con el recurso actualizado | 404 si no existe
cuentasRouter.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const dto = req.body as UpdateCuentaDto;
  const cuentaActualizada = store.update(id, dto);

  if (!cuentaActualizada) {
    res.status(404).json({ error: 'Cuenta no encontrada' });
    return;
  }

  res.status(200).json(cuentaActualizada);
});

// DELETE /cuentas/:id — Eliminar recurso
// Status: 204 sin body | 404 si no existe
cuentasRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const eliminado = store.remove(id);

  if (!eliminado) {
    res.status(404).json({ error: 'Cuenta no encontrada' });
    return;
  }

  res.status(204).send();
});
