# API REST — Cooperativa de Crédito y Ahorro (Semana 02)

Servidor Express 5 + TypeScript con CRUD completo sobre el recurso `Cuenta`,
usando un store en memoria (sin base de datos).

## Dominio y recurso

**Dominio:** Cooperativa de Crédito y Ahorro
**Recurso principal:** `Cuenta`

| Campo | Tipo | Descripción |
|---|---|---|
| id | number | Identificador autoincremental |
| titular | string | Nombre del socio dueño de la cuenta |
| tipo | string | `ahorro`, `credito`, `aportes` o `cdt` |
| saldo | number | Saldo actual de la cuenta (en COP) |
| cupoDisponible | number | Cupo de crédito disponible (0 si no aplica) |
| activa | boolean | Si la cuenta está activa |

## Estructura

```
src/
├── app.ts               # Configuración de Express: middlewares + rutas
├── server.ts             # Entry point + graceful shutdown
├── types.ts               # Interfaz Cuenta, CreateCuentaDto, UpdateCuentaDto
├── store.ts                # CRUD en memoria
└── routes/
    └── cuentas.routes.ts    # 5 endpoints CRUD
```

## Endpoints

| Método | Ruta | Descripción | Status |
|---|---|---|---|
| GET | `/api/v1/cuentas` | Listar todas las cuentas | 200 |
| GET | `/api/v1/cuentas/:id` | Obtener una cuenta por ID | 200 / 404 |
| POST | `/api/v1/cuentas` | Crear una nueva cuenta | 201 |
| PUT | `/api/v1/cuentas/:id` | Actualizar una cuenta | 200 / 404 |
| DELETE | `/api/v1/cuentas/:id` | Eliminar una cuenta | 204 / 404 |

También expone `GET /health` para verificación rápida del servidor.

## Middlewares (en orden)

1. `express.json()` — parseo de body
2. Logger personalizado — registra método, URL, status code y tiempo de respuesta
3. Rutas (`/health`, `/api/v1/cuentas`)
4. Handler 404 — rutas no encontradas
5. Error handler global (4 parámetros, siempre el último)

## Decisiones de diseño

- El `id` es numérico y autoincremental (`nextId++`), reiniciándose cada vez
  que se reinicia el servidor, ya que el store vive solo en memoria.
- `update()` usa `Object.assign` sobre el objeto existente para aplicar
  solo los campos enviados (`UpdateCuentaDto` es un `Partial`).
- El graceful shutdown escucha `SIGTERM` y `SIGINT`, cierra el servidor con
  `server.close()` y solo después llama a `process.exit(0)`, evitando cortar
  conexiones en curso abruptamente.

## Cómo correr

```bash
pnpm install
pnpm dev        # con recarga automática (tsx watch)
pnpm build      # verifica TypeScript estricto
pnpm start      # ejecuta la versión compilada
```

## Pruebas con curl

```bash
# Listar
curl http://localhost:3000/api/v1/cuentas

# Crear
curl -X POST http://localhost:3000/api/v1/cuentas \
  -H "Content-Type: application/json" \
  -d '{"titular":"Laura Gómez","tipo":"ahorro","saldo":1250000,"cupoDisponible":500000,"activa":true}'

# Obtener por ID
curl http://localhost:3000/api/v1/cuentas/1

# Actualizar
curl -X PUT http://localhost:3000/api/v1/cuentas/1 \
  -H "Content-Type: application/json" \
  -d '{"saldo":1500000}'

# Eliminar
curl -X DELETE http://localhost:3000/api/v1/cuentas/1
# Esperar: 204 sin body
```

Ver `logs-ejecucion.txt` para la evidencia de todas las corridas (incluyendo
casos 404 y el graceful shutdown ante `SIGTERM`).
