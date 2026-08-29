// ============================================
// APP — setup de Express con orden correcto de middlewares
// ============================================
import express, { Application } from 'express';
import { morganMiddleware } from './config/logger';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';
import cuentasRouter from './routes/cuentas.routes';

export function createApp(): Application {
  const app = express();

  // Middlewares globales
  app.use(express.json());
  app.use(morganMiddleware);

  // Rutas del dominio
  app.use('/api/v1/cuentas', cuentasRouter);

  // Ruta de salud simple
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // 404 para rutas no registradas (debe ir después de las rutas)
  app.use(notFound);

  // Manejador de errores (siempre al final, 4 parámetros)
  app.use(errorHandler);

  return app;
}
