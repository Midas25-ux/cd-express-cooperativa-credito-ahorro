// ============================================
// APP — Configuración Express
// ============================================

import express from 'express';

import { cuentasRouter } from './routes/cuentas.routes';

import { ErrorResponse } from './types';

const app = express();

app.use(express.json());

// ============================================
// HEALTH CHECK
// ============================================

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    week: '03',
    project: 'api-arquitectura',
    domain: 'cooperativa-credito-ahorro',
  });
});

// ============================================
// API V1
// ============================================

app.use('/api/v1/cuentas', cuentasRouter);

// ============================================
// ERROR HANDLER
// ============================================

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err.message);

    const response: ErrorResponse = {
      error: 'Internal Server Error',
      message: err.message,
    };

    res.status(500).json(response);
  },
);

export default app;