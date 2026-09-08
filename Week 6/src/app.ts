// ============================================
// app.ts — Configuración de Express
// ============================================
import express from 'express';
import clienteRouter from './routes/cliente.routes';
import cuentaRouter from './routes/cuenta.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/clientes', clienteRouter);
app.use('/api/v1/cuentas', cuentaRouter);

app.use(notFound);
app.use(errorHandler);
