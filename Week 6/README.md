# Proyecto Semana 06 — API REST con MongoDB + Mongoose

## Dominio: Cooperativa de Crédito y Ahorro

| Entidad | Rol | Descripción |
|---|---|---|
| Cliente | Secundaria | Titular de las cuentas de la cooperativa |
| Cuenta | Principal | Cuenta de ahorro/corriente, referencia a un Cliente |

### Campos

**Cliente** (`clientes`)
- `nombre` (string, requerido)
- `documento` (string, requerido, único)
- `telefono` (string, opcional)
- `email` (string, opcional)

**Cuenta** (`cuentas`)
- `numeroCuenta` (string, requerido, único)
- `tipo` (`ahorros` | `corriente`, requerido)
- `saldo` (number, requerido, >= 0)
- `cupoDisponible` (number, >= 0, default 0)
- `activa` (boolean, default true)
- `cliente` (ObjectId → ref `Cliente`, requerido)

## Endpoints

### Cliente (`/api/v1/clientes`)
- `GET /` — listar todos
- `GET /:id` — obtener por ID
- `POST /` — crear
- `PUT /:id` — actualizar
- `DELETE /:id` — eliminar

### Cuenta (`/api/v1/cuentas`)
- `GET /?page=1&limit=10&search=` — listar con paginación + populate de `cliente`
- `GET /:id` — obtener con populate de `cliente`
- `POST /` — crear (valida que `cliente` sea un ObjectId válido)
- `PUT /:id` — actualizar
- `DELETE /:id` — eliminar

### Respuesta paginada (`GET /api/v1/cuentas`)
```json
{
  "data": [...],
  "total": 25,
  "page": 1,
  "totalPages": 3
}
```

## Errores manejados
- `400` — ID con formato inválido (CastError / ObjectId inválido)
- `404` — recurso no encontrado
- `409` — clave única duplicada (`numeroCuenta` en Cuenta, `documento` en Cliente)

## Cómo correr el proyecto

```bash
pnpm install
docker compose up -d
cp .env.example .env
pnpm seed
pnpm dev
```

API disponible en `http://localhost:3000/api/v1`.
