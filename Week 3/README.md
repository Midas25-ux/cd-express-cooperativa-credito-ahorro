# 🚀 Proyecto Semana 03 — API REST con Arquitectura en Capas

## 🏦 Cooperativa de Crédito y Ahorro

API REST desarrollada con **Node.js, Express y TypeScript**, aplicando una arquitectura en 4 capas:

```text
Routes → Controllers → Services → Repositories
```

El proyecto permite gestionar cuentas de una cooperativa de crédito y ahorro mediante operaciones CRUD.

---

## 🎯 Objetivo

Construir una API REST completa aplicando una arquitectura en 4 capas:

* **Routes:** mapeo de URLs y métodos HTTP.
* **Controllers:** interfaz entre HTTP y la lógica de negocio.
* **Services:** lógica de negocio, validaciones y paginación.
* **Repositories:** acceso y manipulación del almacenamiento de datos.

El proyecto utiliza **TypeScript** para definir contratos y tipos de respuesta.

---

# 🏦 Dominio

### Dominio asignado

**Cooperativa de Crédito y Ahorro**

### Recurso principal

```text
cuentas
```

La API permite:

* Listar cuentas.
* Consultar una cuenta por ID.
* Crear cuentas.
* Actualizar cuentas.
* Eliminar cuentas.
* Utilizar paginación.
* Manejar errores 404.
* Validar reglas básicas del dominio.

---

# 📋 Modelo de datos

Cada cuenta tiene la siguiente estructura:

```typescript
interface Cuenta {
  id: number;
  numeroCuenta: string;
  titular: string;
  tipo: 'ahorro' | 'corriente' | 'credito';
  saldo: number;
  activa: boolean;
  createdAt: string;
}
```

### Campos

| Campo          | Tipo    | Descripción                      |
| -------------- | ------- | -------------------------------- |
| `id`           | number  | Identificador único de la cuenta |
| `numeroCuenta` | string  | Número de cuenta                 |
| `titular`      | string  | Nombre del titular               |
| `tipo`         | string  | Tipo de cuenta                   |
| `saldo`        | number  | Saldo disponible                 |
| `activa`       | boolean | Estado de la cuenta              |
| `createdAt`    | string  | Fecha de creación                |

### Tipos de cuenta disponibles

```text
ahorro
corriente
credito
```

---

# 📁 Estructura del proyecto

```text
Week 3/
│
├── package.json
├── tsconfig.json
├── .env.example
├── README.md
│
└── src/
    │
    ├── app.ts
    ├── server.ts
    ├── types.ts
    │
    ├── routes/
    │   └── cuentas.routes.ts
    │
    ├── controllers/
    │   └── cuentas.controller.ts
    │
    ├── services/
    │   └── cuentas.service.ts
    │
    └── repositories/
        └── cuentas.repository.ts
```

---

# 🏗️ Arquitectura en 4 capas

## 1. Routes

Archivo:

```text
src/routes/cuentas.routes.ts
```

Esta capa solamente realiza el mapeo entre las rutas HTTP y los controllers.

Ejemplo:

```text
GET     /api/v1/cuentas
GET     /api/v1/cuentas/:id
POST    /api/v1/cuentas
PUT     /api/v1/cuentas/:id
DELETE  /api/v1/cuentas/:id
```

Las rutas no contienen lógica de negocio.

---

## 2. Controllers

Archivo:

```text
src/controllers/cuentas.controller.ts
```

Los controllers funcionan como interfaz HTTP.

Cada controller sigue exactamente tres pasos:

```text
1. Extraer
2. Llamar al service
3. Responder
```

El controller no contiene lógica de negocio.

También maneja las respuestas `404` cuando el service retorna `undefined` o `false`.

Todos los métodos utilizan:

```typescript
try/catch
```

y los errores son enviados mediante:

```typescript
next(err)
```

---

## 3. Services

Archivo:

```text
src/services/cuentas.service.ts
```

Esta capa contiene la lógica de negocio.

Responsabilidades:

* Comunicación con el repository.
* Paginación.
* Validación del saldo.
* Validación del tipo de cuenta.
* Verificación de existencia antes de actualizar.
* Verificación de existencia antes de eliminar.

El service **no utiliza Express**.

---

## 4. Repository

Archivo:

```text
src/repositories/cuentas.repository.ts
```

Es la única capa que tiene acceso al almacenamiento de datos.

Actualmente utiliza un array en memoria como store:

```typescript
const store: Cuenta[] = [];
```

Todos sus métodos son asíncronos:

```typescript
Promise<Cuenta[]>
Promise<Cuenta | undefined>
Promise<Cuenta>
Promise<boolean>
```

Además, utiliza copias defensivas para evitar exponer directamente las referencias internas del store.

---

# 🔗 Endpoints

## 1. Listar cuentas

### GET

```text
/api/v1/cuentas
```

Permite utilizar paginación mediante los parámetros:

```text
?page=1&limit=5
```

### Ejemplo

```text
GET http://localhost:3000/api/v1/cuentas?page=1&limit=3
```

### Respuesta

**200 OK**

```json
{
  "data": [
    {
      "id": 1,
      "numeroCuenta": "CTA-1001",
      "titular": "Carlos Rodríguez",
      "tipo": "ahorro",
      "saldo": 2500000,
      "activa": true,
      "createdAt": "2026-08-01T10:00:00.000Z"
    },
    {
      "id": 2,
      "numeroCuenta": "CTA-1002",
      "titular": "María González",
      "tipo": "corriente",
      "saldo": 4800000,
      "activa": true,
      "createdAt": "2026-08-02T11:00:00.000Z"
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 3
}
```

---

# 2. Obtener cuenta por ID

### GET

```text
/api/v1/cuentas/:id
```

### Ejemplo

```text
GET http://localhost:3000/api/v1/cuentas/1
```

### Respuesta

**200 OK**

```json
{
  "data": {
    "id": 1,
    "numeroCuenta": "CTA-1001",
    "titular": "Carlos Rodríguez",
    "tipo": "ahorro",
    "saldo": 2500000,
    "activa": true,
    "createdAt": "2026-08-01T10:00:00.000Z"
  }
}
```

---

# 3. Crear cuenta

### POST

```text
/api/v1/cuentas
```

### Ejemplo

```text
POST http://localhost:3000/api/v1/cuentas
```

### Body

```json
{
  "numeroCuenta": "CTA-1006",
  "titular": "Brayan Moreno",
  "tipo": "ahorro",
  "saldo": 1500000,
  "activa": true
}
```

### Respuesta

**201 Created**

```json
{
  "data": {
    "id": 6,
    "numeroCuenta": "CTA-1006",
    "titular": "Brayan Moreno",
    "tipo": "ahorro",
    "saldo": 1500000,
    "activa": true,
    "createdAt": "2026-08-28T..."
  }
}
```

El `id` y `createdAt` son generados automáticamente.

---

# 4. Actualizar cuenta

### PUT

```text
/api/v1/cuentas/:id
```

### Ejemplo

```text
PUT http://localhost:3000/api/v1/cuentas/1
```

### Body

```json
{
  "saldo": 3000000,
  "activa": true
}
```

### Respuesta

**200 OK**

```json
{
  "data": {
    "id": 1,
    "numeroCuenta": "CTA-1001",
    "titular": "Carlos Rodríguez",
    "tipo": "ahorro",
    "saldo": 3000000,
    "activa": true,
    "createdAt": "2026-08-01T10:00:00.000Z"
  }
}
```

---

# 5. Eliminar cuenta

### DELETE

```text
/api/v1/cuentas/:id
```

### Ejemplo

```text
DELETE http://localhost:3000/api/v1/cuentas/5
```

### Respuesta

```text
204 No Content
```

La respuesta no contiene cuerpo.

---

# ❌ Manejo de errores

Cuando se consulta una cuenta que no existe:

```text
GET /api/v1/cuentas/999
```

La API responde:

**404 Not Found**

```json
{
  "error": "Not Found",
  "message": "Cuenta 999 not found"
}
```

El mismo formato se utiliza cuando se intenta actualizar o eliminar una cuenta inexistente.

---

# ⚠️ Validaciones de negocio

La API implementa validaciones dentro de la capa `services`.

## Saldo

El saldo no puede ser negativo.

Ejemplo incorrecto:

```json
{
  "numeroCuenta": "CTA-1007",
  "titular": "Pedro Pérez",
  "tipo": "ahorro",
  "saldo": -500000,
  "activa": true
}
```

La API genera un error indicando:

```text
El saldo no puede ser negativo
```

## Tipo de cuenta

Los tipos permitidos son:

```text
ahorro
corriente
credito
```

---

# ❤️ Health Check

La aplicación dispone de un endpoint para comprobar que el servidor está funcionando.

### GET

```text
/health
```

### Ejemplo

```text
GET http://localhost:3000/health
```

### Respuesta

```json
{
  "status": "ok",
  "week": "03",
  "project": "api-arquitectura",
  "domain": "cooperativa-credito-ahorro"
}
```

---

# ⚙️ Tecnologías utilizadas

* **Node.js**
* **Express 5**
* **TypeScript**
* **pnpm**
* **tsx**

---

# 📦 Instalación

Clonar o copiar el proyecto y entrar a la carpeta:

```bash
cd "Week 3"
```

Instalar las dependencias:

```bash
pnpm install
```

---

# 🔐 Variables de entorno

Copiar el archivo:

```text
.env.example
```

como:

```text
.env
```

Contenido:

```env
PORT=3000
NODE_ENV=development
```

---

# ▶️ Ejecutar el proyecto

Para iniciar el servidor en modo desarrollo:

```bash
pnpm dev
```

El servidor estará disponible en:

```text
http://localhost:3000
```

API:

```text
http://localhost:3000/api/v1/cuentas
```

Health Check:

```text
http://localhost:3000/health
```

---

# 🏗️ Compilar el proyecto

Para comprobar que TypeScript no tenga errores:

```bash
pnpm build
```

El proyecto debe compilar correctamente sin errores de TypeScript.

Los archivos compilados se generan en:

```text
dist/
```

---

# 🧪 Pruebas con Thunder Client

Los cinco endpoints principales deben probarse utilizando Thunder Client.

## GET — Listar

```text
GET http://localhost:3000/api/v1/cuentas?page=1&limit=3
```

## GET — Obtener por ID

```text
GET http://localhost:3000/api/v1/cuentas/1
```

## POST — Crear

```text
POST http://localhost:3000/api/v1/cuentas
```

Body:

```json
{
  "numeroCuenta": "CTA-1006",
  "titular": "Brayan Moreno",
  "tipo": "ahorro",
  "saldo": 1500000,
  "activa": true
}
```

## PUT — Actualizar

```text
PUT http://localhost:3000/api/v1/cuentas/1
```

Body:

```json
{
  "saldo": 3000000
}
```

## DELETE — Eliminar

```text
DELETE http://localhost:3000/api/v1/cuentas/5
```

---

# 📸 Evidencias

Para la entrega del proyecto se deben presentar:

### 1. Thunder Client

Screenshot mostrando los cinco endpoints funcionando:

```text
GET
GET/:id
POST
PUT/:id
DELETE/:id
```

### 2. Compilación

Screenshot de:

```bash
pnpm build
```

mostrando que TypeScript compila sin errores.

---

# 📌 Entregables

* [x] API REST implementada.
* [x] Dominio de Cooperativa de Crédito y Ahorro.
* [x] Recurso `cuentas`.
* [x] Arquitectura en 4 capas.
* [x] CRUD completo.
* [x] Paginación.
* [x] Contratos de respuesta tipados.
* [x] Manejo de errores 404.
* [x] Validaciones de dominio.
* [x] README actualizado.
* [ ] Screenshot de Thunder Client con los endpoints funcionando.
* [ ] Screenshot de `pnpm build` sin errores.

---

# 👨‍💻 Proyecto

**Semana 03 — API REST con Arquitectura en Capas**

**Dominio:** Cooperativa de Crédito y Ahorro

**Recurso:** Cuentas

**Tecnologías:** Node.js + Express + TypeScript
