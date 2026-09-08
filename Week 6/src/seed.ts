// ============================================
// SEED — Insertar datos de prueba
// Dominio: Cooperativa de Crédito y Ahorro
// Orden: Cliente (secundaria) primero, luego Cuenta (principal)
// ============================================
import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose';
import { Cliente } from './models/cliente.model';
import { Cuenta } from './models/cuenta.model';

async function seed(): Promise<void> {
  await connectDB();

  await Cuenta.deleteMany({});
  await Cliente.deleteMany({});
  console.log('Collections cleared');

  const [cliente1, cliente2, cliente3] = await Cliente.insertMany([
    { nombre: 'Ana Gómez', documento: '1001234567', telefono: '3001112233', email: 'ana.gomez@example.com' },
    { nombre: 'Carlos Pérez', documento: '1002345678', telefono: '3002223344', email: 'carlos.perez@example.com' },
    { nombre: 'Lucía Ramírez', documento: '1003456789', telefono: '3003334455', email: 'lucia.ramirez@example.com' },
  ]);
  console.log('Clientes inserted');

  await Cuenta.insertMany([
    {
      numeroCuenta: 'CTA-0001',
      tipo: 'ahorros',
      saldo: 500000,
      cupoDisponible: 100000,
      activa: true,
      cliente: cliente1._id,
    },
    {
      numeroCuenta: 'CTA-0002',
      tipo: 'corriente',
      saldo: 1200000,
      cupoDisponible: 300000,
      activa: true,
      cliente: cliente1._id,
    },
    {
      numeroCuenta: 'CTA-0003',
      tipo: 'ahorros',
      saldo: 75000,
      cupoDisponible: 0,
      activa: true,
      cliente: cliente2._id,
    },
    {
      numeroCuenta: 'CTA-0004',
      tipo: 'ahorros',
      saldo: 0,
      cupoDisponible: 0,
      activa: false,
      cliente: cliente3._id,
    },
    {
      numeroCuenta: 'CTA-0005',
      tipo: 'corriente',
      saldo: 340000,
      cupoDisponible: 150000,
      activa: true,
      cliente: cliente2._id,
    },
  ]);
  console.log('Cuentas inserted');

  console.log('Seed completed successfully');
  await disconnectDB();
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
