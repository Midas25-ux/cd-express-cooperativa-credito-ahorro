# Semana 05 — API con PostgreSQL y Prisma ORM

## Dominio asignado
**Cooperativa de Crédito y Ahorro**

- Recurso principal: **Cuenta**
- Recurso secundario (relación 1:N): **Cliente** — un cliente puede tener varias cuentas

## Diagrama de entidades (texto)

```
Cliente (1) ───────< (N) Cuenta
  id (uuid, PK)            id (uuid, PK)
  nombre                   numeroCuenta (unique)
  documento (unique)       tipo (AHORRO | CORRIENTE)
  email (unique)           saldo
  telefono?                cupoDisponible
  createdAt / updatedAt    activa
                           clienteId (uuid, FK → Cliente.id)
                           createdAt / updatedAt
```

## Modelos (`prisma/schema.prisma`)

| Modelo    | Campo            | Tipo         | Nota                          |
|-----------|------------------|--------------|-------------------------------|
| Cliente   | documento        | String       | `@unique`                     |
| Cliente   | email            | String       | `@unique`                     |
| Cuenta    | numeroCuenta     | String       | `@unique` (demuestra P2002)   |
| Cuenta    | tipo             | Enum         | `AHORRO` \| `CORRIENTE`       |
| Cuenta    | saldo            | Float        | default `0`                   |
| Cuenta    | cupoDisponible   | Float        | default `0`                   |
| Cuenta    | activa           | Boolean      | default `true`                |
| Cuenta    | clienteId        | String @uuid | FK → `Cliente.id`              |

## Endpoints (`/api/v1/cuentas`)

| Método | Ruta                  | Descripción            | Status      |
|--------|-----------------------|--------------------------|-------------|
| GET    | `/api/v1/cuentas`     | Listado paginado         | 200         |
| GET    | `/api/v1/cuentas/:id` | Detalle con cliente      | 200 / 404   |
| POST   | `/api/v1/cuentas`     | Crear                    | 201 / 400 / 409 |
| PUT    | `/api/v1/cuentas/:id` | Actualizar               | 200 / 404   |
| DELETE | `/api/v1/cuentas/:id` | Eliminar                 | 204 / 404   |

### Ejemplos

**POST /api/v1/cuentas**

Request:
```json
{
  "numeroCuenta": "CTA-0006",
  "tipo": "AHORRO",
  "saldo": 500000,
  "clienteId": "5f2a1b3c-....-uuid"
}
```

Response `201`:
```json
{
  "data": {
    "id": "b1e0....-uuid",
    "numeroCuenta": "CTA-0006",
    "tipo": "AHORRO",
    "saldo": 500000,
    "cupoDisponible": 0,
    "activa": true,
    "clienteId": "5f2a1b3c-....-uuid",
    "createdAt": "2026-08-29T00:00:00.000Z",
    "updatedAt": "2026-08-29T00:00:00.000Z"
  }
}
```

**GET /api/v1/cuentas?page=1&limit=10**

Response `200`:
```json
{
  "data": [ /* cuentas, cada una con su "cliente" incluido */ ],
  "total": 5,
  "page": 1,
  "limit": 10
}
```

**Errores de Prisma**
- Crear una cuenta con un `numeroCuenta` que ya existe → `409` (`P2002`)
- Actualizar/eliminar una cuenta con un `id` inexistente → `404` (`P2025`)

## Cómo ejecutar el proyecto

Requiere Node >= 22, pnpm y Docker.

```bash
# 1. Levantar PostgreSQL
docker compose up -d

# 2. Instalar dependencias
pnpm install

# 3. Copiar variables de entorno
cp .env.example .env

# 4. Ejecutar la primera migración
pnpm dlx prisma migrate dev --name init

# 5. Ejecutar el seed
pnpm dlx prisma db seed

# 6. Iniciar el servidor en modo desarrollo
pnpm dev
```

## Logs del seed

```
🌱 Iniciando seed...
✅ 3 clientes creados
✅ 5 cuentas creadas
```

*(Reemplaza este bloque con la salida real de tu `pnpm dlx prisma db seed` al ejecutarlo contra tu base de datos.)*
