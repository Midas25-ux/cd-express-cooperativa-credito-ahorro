import { Router, IRouter } from 'express';
import * as memberController from '../controllers/member.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router: IRouter = Router();

// Todas las rutas de socios requieren autenticación
router.use(authMiddleware);

// GET    /api/v1/socios        — listar todos los socios
router.get('/', memberController.getAll);

// GET    /api/v1/socios/:id    — obtener un socio por ID
router.get('/:id', memberController.getById);

// POST   /api/v1/socios        — registrar un nuevo socio
router.post('/', memberController.create);

// PATCH  /api/v1/socios/:id    — actualizar socio parcialmente
router.patch('/:id', memberController.update);

// DELETE /api/v1/socios/:id    — dar de baja un socio
router.delete('/:id', memberController.remove);

export default router;
