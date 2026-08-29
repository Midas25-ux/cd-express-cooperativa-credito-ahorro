# Semana 04 — Validación, Errores y Logging

## Dominio asignado
**Cooperativa de Crédito y Ahorro** — recurso principal: **Cuenta**

## Campos del schema (`src/schemas/cuenta.schema.ts`)

| Campo            | Tipo    | Validación                                              |
|-------------------|---------|----------------------------------------------------------|
| `titular`         | string  | Obligatorio, mínimo 3 caracteres, se recorta (`trim`)     |
| `tipo`             | enum    | Obligatorio, solo acepta `"ahorro"` o `"corriente"`       |
| `saldo`            | number  | Obligatorio, no puede ser negativo, por defecto `0`       |
| `cupoDisponible`   | number  | Opcional, no puede ser negativo, por defecto `0`          |
| `activa`           | boolean | Opcional, por defecto `true`                              |

`updateItemSchema` reutiliza `createItemSchema.partial()` para permitir actualizaciones parciales.

## Arquitectura

```
Rutas (cuentas.routes.ts)
  → Controladores (cuentas.controller.ts)     — validación con Zod, next(err)
    → Servicios (cuentas.service.ts)          — lógica de negocio, lanza AppError
      → Repositorios (cuentas.repository.ts)  — CRUD en memoria
```

- `AppError` centraliza los errores operacionales (ej. `404` cuando la cuenta no existe).
- `errorHandler` (4 parámetros) distingue `ZodError` → 400, `AppError` → su `statusCode`, y errores genéricos → 500.
- `notFound` captura rutas no registradas y responde JSON (no HTML).
- Logging con Winston: nivel `http` en desarrollo (colorizado) y `warn` en producción (JSON), con archivo `logs/error.log` solo en producción. Morgan se integra vía la stream de Winston.

## Endpoints

| Método | Ruta                     | Descripción                  |
|--------|--------------------------|-------------------------------|
| GET    | `/api/v1/cuentas`        | Listar con paginación (`page`, `limit`) |
| GET    | `/api/v1/cuentas/:id`    | Obtener por id                |
| POST   | `/api/v1/cuentas`        | Crear validando con Zod       |
| PUT    | `/api/v1/cuentas/:id`    | Actualizar (campos opcionales)|
| DELETE | `/api/v1/cuentas/:id`    | Eliminar                      |

La paginación (`GET /api/v1/cuentas?page=&limit=`) responde con `{ data, total, page, limit }` (forma plana, no anidada).

## Cómo ejecutar el proyecto

Requiere Node >= 22 y pnpm.

```bash
pnpm install
pnpm dev
```

El servidor arranca por defecto en `http://localhost:3000`.

### Pruebas rápidas

```bash
# Crear una cuenta inválida (sin titular) → 400 con issues[]
curl -X POST http://localhost:3000/api/v1/cuentas -H "Content-Type: application/json" -d "{\"tipo\":\"ahorro\"}"

# id no numérico → 400
curl http://localhost:3000/api/v1/cuentas/abc

# id inexistente → 404
curl http://localhost:3000/api/v1/cuentas/999

# ruta inexistente → 404 JSON
curl http://localhost:3000/api/v1/no-existe
```
