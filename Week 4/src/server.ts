// ============================================
// SERVER — bootstrap de la aplicación
// ============================================
import { createApp } from './app';
import { logger } from './config/logger';

const PORT = Number(process.env['PORT']) || 3000;

const app = createApp();

app.listen(PORT, () => {
  logger.info(`Servidor de Cuentas (Cooperativa de Crédito y Ahorro) escuchando en el puerto ${PORT}`);
});
