# 🏦 Semana 07 — API con Autenticación JWT: Cooperativa de Ahorro y Crédito

## 🎯 Dominio

**Cooperativa de Ahorro y Crédito** — recurso principal: **Socio**

Cada socio representa a un miembro activo de la cooperativa. Al registrarse se le
asigna un tipo de cuenta, un saldo inicial de ahorro y un límite de crédito aprobado.

### Campos del Socio

| Campo           | Tipo                                      | Descripción                                        |
|-----------------|-------------------------------------------|----------------------------------------------------|
| `fullName`      | `string`                                  | Nombre completo del socio                          |
| `cedula`        | `string` (único)                          | Cédula / documento de identidad                    |
| `tipoCuenta`    | `'ahorro' \| 'aportaciones' \| 'credito'` | Tipo de cuenta en la cooperativa                   |
| `saldoAhorro`   | `number` (≥ 0)                            | Saldo actual de ahorro (USD)                       |
| `limiteCredito` | `number` (≥ 0)                            | Límite de crédito aprobado (USD); 0 si no aplica   |
| `cuotaPagada`   | `boolean`                                 | Si la cuota de membresía del período está pagada   |
| `phone`         | `string` (opcional)                       | Teléfono de contacto                               |
| `active`        | `boolean`                                 | Si el socio está activo (default: `true`)          |
| `registradoPor` | `ObjectId → User`                         | Usuario que registró al socio                      |

### Reglas de negocio

- La `cedula` es única — no pueden existir dos socios con el mismo número.
- Un socio con `tipoCuenta: 'credito'` debe tener `limiteCredito > 0`.
- `saldoAhorro` y `limiteCredito` no pueden ser negativos.

---

## 🚀 Inicio rápido

```bash
# 1. Instalar dependencias
pnpm install

# 2. Copiar variables de entorno
cp .env.example .env
# Editar .env — generar secretos con:
#   openssl rand -base64 64

# 3. Levantar MongoDB con Docker
docker compose up -d

# 4. Insertar datos de prueba (opcional)
pnpm seed

# 5. Arrancar el servidor en modo dev
pnpm dev
```

El servidor queda disponible en `http://localhost:3000`.

### Credenciales del seed

| Email | Contraseña | Rol |
|---|---|---|
| admin@cooperativa.com | Admin123 | admin |
| operador@cooperativa.com | Admin123 | user |

---

## 📡 Endpoints

### Autenticación — `/api/v1/auth`

| Método | Ruta        | Auth | Descripción                         |
|--------|-------------|------|-------------------------------------|
| POST   | `/register` | ❌   | Registro de usuario                 |
| POST   | `/login`    | ❌   | Login — emite cookies HttpOnly      |
| POST   | `/refresh`  | ❌   | Renueva access token (rotación)     |
| GET    | `/me`       | ✅   | Perfil del usuario autenticado      |
| POST   | `/logout`   | ✅   | Cierra sesión e invalida el refresh |

### Health check

| Método | Ruta      | Auth | Descripción          |
|--------|-----------|------|----------------------|
| GET    | `/health` | ❌   | Estado del servidor  |

### Socios — `/api/v1/socios`

Todas las rutas requieren autenticación (`accessToken` cookie).

| Método | Ruta    | Descripción                              |
|--------|---------|------------------------------------------|
| GET    | `/`     | Listar todos los socios                  |
| GET    | `/:id`  | Obtener socio por ID (404 si no existe)  |
| POST   | `/`     | Registrar nuevo socio (201)              |
| PATCH  | `/:id`  | Actualización parcial del socio          |
| DELETE | `/:id`  | Dar de baja un socio (204)               |

---

## 📋 Ejemplos de body

### Registrar usuario
```json
{
  "email": "operador@cooperativa.com",
  "password": "Secreto123",
  "name": "Ana García"
}
```

### Crear socio — cuenta de ahorro
```json
{
  "fullName": "Carlos Mendoza López",
  "cedula": "0912345678",
  "tipoCuenta": "ahorro",
  "saldoAhorro": 250.00,
  "limiteCredito": 0,
  "cuotaPagada": true,
  "phone": "+593987654321"
}
```

### Crear socio — línea de crédito
```json
{
  "fullName": "María Torres Vega",
  "cedula": "1756789012",
  "tipoCuenta": "credito",
  "saldoAhorro": 500.00,
  "limiteCredito": 5000.00,
  "cuotaPagada": true
}
```

### Actualizar socio (parcial)
```json
{
  "saldoAhorro": 750.00,
  "cuotaPagada": false
}
```

---

## 🔐 Seguridad

| Criterio | Implementación |
|---|---|
| Contraseñas hasheadas | `bcrypt` con 10 salt rounds |
| Tokens en cookies HttpOnly | `accessToken` + `refreshToken` |
| Refresh token hasheado en DB | Solo el hash, nunca el token en claro |
| Rotación de refresh token | Cada `/refresh` invalida el anterior |
| Secrets por variables de entorno | `.env` — nunca hardcodeados |
| Rutas protegidas | `authMiddleware` en todas las rutas de socios |
| Prevención de user enumeration | Mismo mensaje para email/contraseña incorrectos |

---

## 🗂️ Estructura del proyecto

```
src/
├── app.ts                      # Monta routers y middlewares
├── server.ts                   # connectDB + listen
├── lib/mongoose.ts             # connectDB / disconnectDB
├── errors/AppError.ts          # Error operacional con statusCode
├── types/express.d.ts          # req.user tipado globalmente
├── utils/jwt.ts                # sign/verify access + refresh
├── middlewares/
│   ├── auth.middleware.ts      # Verifica accessToken en cookie
│   ├── errorHandler.ts         # Manejo centralizado de errores
│   └── notFound.ts             # 404 catch-all
├── schemas/
│   ├── auth.schema.ts          # Zod: register / login
│   └── member.schema.ts        # Zod: createSocio / updateSocio
├── models/
│   ├── user.model.ts           # Mongoose User
│   └── member.model.ts         # Mongoose Socio
├── repositories/
│   ├── users.repository.ts     # Operaciones DB de usuario
│   └── member.repository.ts    # Operaciones DB de socio
├── services/
│   ├── auth.service.ts         # Lógica de autenticación
│   └── member.service.ts       # Lógica de negocio de socios
├── controllers/
│   ├── auth.controller.ts      # Handlers de auth
│   └── member.controller.ts    # Handlers de socios
├── routes/
│   ├── auth.routes.ts          # Rutas de auth
│   └── member.routes.ts        # Rutas CRUD de socios (/api/v1/socios)
└── seed.ts                     # Datos de prueba (pnpm seed)
```

---

## 🔗 Navegación

← [Semana 06: MongoDB + Mongoose](../Week%206) | Semana 08: Autorización y Seguridad →
