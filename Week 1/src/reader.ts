// ============================================
// READER — Lee el archivo de datos JSON
// ============================================
import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Cuenta } from './types.js';

export async function readItems(): Promise<Cuenta[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'cuentas.json');
  try {
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as Cuenta[];
  } catch (err) {
    throw new Error(`No se pudo leer el archivo de datos en ${filePath}: ${err}`);
  }
}
