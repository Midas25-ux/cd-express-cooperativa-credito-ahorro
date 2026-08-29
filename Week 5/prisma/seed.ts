// prisma/seed.ts — Datos iniciales del dominio Cooperativa de Crédito y Ahorro
// Ejecutar con: pnpm dlx prisma db seed
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed...');

  // 1. Limpiar datos existentes para idempotencia (orden importa por la FK)
  await prisma.cuenta.deleteMany();
  await prisma.cliente.deleteMany();

  // 2. Crear clientes (recurso secundario)
  const clientes = await Promise.all([
    prisma.cliente.create({
      data: {
        nombre: 'Ana María Rojas',
        documento: '1001234567',
        email: 'ana.rojas@example.com',
        telefono: '3001234567',
      },
    }),
    prisma.cliente.create({
      data: {
        nombre: 'Carlos Peña',
        documento: '1002345678',
        email: 'carlos.pena@example.com',
        telefono: '3012345678',
      },
    }),
    prisma.cliente.create({
      data: {
        nombre: 'Lucía Fernández',
        documento: '1003456789',
        email: 'lucia.fernandez@example.com',
        telefono: '3023456789',
      },
    }),
  ]);

  const [ana, carlos, lucia] = clientes;

  // 3. Crear cuentas (recurso principal) — mínimo 5 registros
  const result = await prisma.cuenta.createMany({
    data: [
      { numeroCuenta: 'CTA-0001', tipo: 'AHORRO', saldo: 1_250_000, cupoDisponible: 0, activa: true, clienteId: ana!.id },
      { numeroCuenta: 'CTA-0002', tipo: 'CORRIENTE', saldo: 3_400_000, cupoDisponible: 500_000, activa: true, clienteId: carlos!.id },
      { numeroCuenta: 'CTA-0003', tipo: 'AHORRO', saldo: 0, cupoDisponible: 0, activa: false, clienteId: lucia!.id },
      { numeroCuenta: 'CTA-0004', tipo: 'AHORRO', saldo: 780_000, cupoDisponible: 0, activa: true, clienteId: ana!.id },
      { numeroCuenta: 'CTA-0005', tipo: 'CORRIENTE', saldo: 2_150_000, cupoDisponible: 300_000, activa: true, clienteId: carlos!.id },
    ],
  });

  console.log(`✅ ${clientes.length} clientes creados`);
  console.log(`✅ ${result.count} cuentas creadas`);
}

main()
  .catch((err: unknown) => {
    console.error('❌ Error en seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
