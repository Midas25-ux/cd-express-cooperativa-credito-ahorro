# Procesador de Datos — Dominio: Cooperativa de Crédito y Ahorro

## Recurso: `Cuenta`

| Campo original (`Item`) | Campo adaptado (`Cuenta`) |
|---|---|
| id | id |
| name | titular |
| category | tipo (ahorro, credito, aportes, cdt) |
| price | saldo |
| stock | cupoDisponible |
| active | activa |

Archivo de datos: `data/cuentas.json` (12 registros).

## Cómo correr

```bash
cd 3-proyecto/starter
pnpm install
pnpm dev                          # sin filtro — muestra todas
pnpm dev -- --category credito    # con filtro
pnpm build                        # verifica TypeScript estricto
```

Ver `logs-ejecucion.txt` para las corridas de ejemplo y `output/report.json`
para el reporte generado.
