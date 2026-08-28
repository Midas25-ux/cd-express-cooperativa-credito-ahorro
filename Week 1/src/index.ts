// ============================================
// ENTRY POINT — Orquesta todo el flujo
// ============================================
import { readItems } from './reader.js';
import { filterByCategory, calculateSummary } from './processor.js';
import { writeReport } from './writer.js';
import type { Report } from './types.js';

const args = process.argv.slice(2);
const categoryIndex = args.indexOf('--category');
const categoryFilter: string | null = categoryIndex !== -1 ? args[categoryIndex + 1]! : null;

async function main(): Promise<void> {
  try {
    const items = await readItems();
    const filteredItems = filterByCategory(items, categoryFilter);
    const summary = calculateSummary(filteredItems);

    const report: Report = {
      generatedAt: new Date().toISOString(),
      appliedFilter: categoryFilter,
      summary,
      items: filteredItems,
    };

    console.log(`Total: ${summary.total}`);
    console.log(`Activos: ${summary.active}`);
    console.log(`Precio promedio: ${summary.averagePrice}`);
    console.log(`Categorías: ${summary.categories.join(', ')}`);

    await writeReport(report);
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
