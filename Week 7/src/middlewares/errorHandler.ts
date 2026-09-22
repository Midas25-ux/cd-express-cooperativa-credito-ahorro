import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';

// ⚠️ Express detecta los error handlers por la cantidad de parámetros (4).
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // 1. Error de validación de Zod
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Datos de entrada inválidos',
      issues: err.issues.map((issue) => ({
        field: issue.path.join('.') || 'root',
        message: issue.message,
      })),
    });
    return;
  }

  // 2. Error operacional conocido (AppError)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // 3. Error genérico / no controlado
  const isProduction = process.env.NODE_ENV === 'production';
  const message = err instanceof Error ? err.message : 'Error desconocido';
  const stack = err instanceof Error ? err.stack : undefined;

  console.error('Unhandled error:', message, stack);

  res.status(500).json({
    error: 'Error interno del servidor',
    ...(isProduction ? {} : { message, stack }),
  });
}
