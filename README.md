# Sunrise Taquitos — Web

Sitio web de Sunrise Taquitos: información del restaurante, menú (desde Toast POS) y, en fases posteriores, panel de administración y órdenes en línea.

## Requisitos

- Node.js 24 o superior

## Arranque

```bash
npm install
cp .env.example .env.local   # aún no es obligatorio: Toast todavía no está conectado
npm run dev
```

Abre http://localhost:3000.

## Scripts

| Script | Uso |
|---|---|
| `npm run dev` | Desarrollo |
| `npm run build` / `npm start` | Build y servidor de producción |
| `npm run lint` | ESLint (incluye las reglas de capas) |
| `npm run typecheck` | TypeScript |
| `npm test` | Tests unitarios (Vitest) |
| `npm run check` | Lint + typecheck + tests |

## Documentación

- [docs/arquitectura.md](docs/arquitectura.md): capas, estructura y hoja de ruta de Toast.
- [docs/brand/](docs/brand/): marca, voz y pendientes.
- [AGENTS.md](AGENTS.md): reglas del repo (para personas y agentes de código).
