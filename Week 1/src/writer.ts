// ============================================
// WRITER — Escribe el reporte en output/report.json
// ============================================
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { Report } from './types.js';

export async function writeReport(report: Report): Promise<void> {
  const outputDir = join(import.meta.dirname, '..', 'output');
  await mkdir(outputDir, { recursive: true });

  const outputPath = join(outputDir, 'report.json');
  const data = JSON.stringify(report, null, 2);
  await writeFile(outputPath, data);

  console.log(`Reporte guardado en: ${outputPath}`);
}
