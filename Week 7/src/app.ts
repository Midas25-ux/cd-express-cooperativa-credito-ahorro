import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import memberRouter from './routes/member.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app: Express = express();

app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', week: 7, project: 'autenticacion-jwt', domain: 'cooperativa-ahorro-credito' });
});

// Rutas de autenticación
app.use('/api/v1/auth', authRouter);

// Rutas del recurso principal — Socios de la Cooperativa de Ahorro y Crédito
app.use('/api/v1/socios', memberRouter);

// Middlewares de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);
