// ============================================
// SEED — Insertar datos de prueba
// Dominio: Cooperativa de Ahorro y Crédito
// Orden: Usuarios primero, luego Socios
// Ejecutar: pnpm seed
// ============================================
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { connectDB, disconnectDB } from './lib/mongoose';
import { UserModel } from './models/user.model';
import { SocioModel } from './models/member.model';

const SALT_ROUNDS = 10;

async function seed(): Promise<void> {
  await connectDB();

  // Limpiar colecciones
  await SocioModel.deleteMany({});
  await UserModel.deleteMany({});
  console.log('Colecciones vaciadas');

  // ── Usuarios ──────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('Admin123', SALT_ROUNDS);

  const [admin, operador] = await UserModel.insertMany([
    {
      email: 'admin@cooperativa.com',
      password: hashedPassword,
      name: 'Administrador General',
      role: 'admin',
    },
    {
      email: 'operador@cooperativa.com',
      password: hashedPassword,
      name: 'Operador de Cuentas',
      role: 'user',
    },
  ]);
  console.log('Usuarios insertados');

  // ── Socios ────────────────────────────────────────────────────────────────
  await SocioModel.insertMany([
    {
      fullName: 'Carlos Andrés Mendoza',
      cedula: '0912345678',
      tipoCuenta: 'ahorro',
      saldoAhorro: 850.00,
      limiteCredito: 0,
      cuotaPagada: true,
      phone: '+593987654321',
      active: true,
      registradoPor: admin._id,
    },
    {
      fullName: 'María Elena Torres',
      cedula: '1756789012',
      tipoCuenta: 'credito',
      saldoAhorro: 1200.00,
      limiteCredito: 5000.00,
      cuotaPagada: true,
      phone: '+593912345678',
      active: true,
      registradoPor: admin._id,
    },
    {
      fullName: 'José Luis Paredes',
      cedula: '0801234567',
      tipoCuenta: 'aportaciones',
      saldoAhorro: 300.00,
      limiteCredito: 0,
      cuotaPagada: false,
      active: true,
      registradoPor: operador._id,
    },
    {
      fullName: 'Ana Lucía Vásquez',
      cedula: '1312345678',
      tipoCuenta: 'credito',
      saldoAhorro: 600.00,
      limiteCredito: 3000.00,
      cuotaPagada: true,
      phone: '+593998877665',
      active: true,
      registradoPor: operador._id,
    },
    {
      fullName: 'Roberto Calderón Mora',
      cedula: '0501234567',
      tipoCuenta: 'ahorro',
      saldoAhorro: 0,
      limiteCredito: 0,
      cuotaPagada: false,
      active: false,
      registradoPor: admin._id,
    },
  ]);
  console.log('Socios insertados');

  console.log('\n✅ Seed completado exitosamente');
  console.log('   Credenciales de prueba:');
  console.log('   admin@cooperativa.com / Admin123');
  console.log('   operador@cooperativa.com / Admin123');

  await disconnectDB();
}

seed().catch((err: unknown) => {
  console.error('Seed falló:', err);
  process.exit(1);
});
