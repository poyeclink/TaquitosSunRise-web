# Sunrise Taquitos — Web

Instrucciones para cualquier agente de código (Claude Code, Cursor, Codex, etc.) que trabaje en este repositorio.

## Contexto

- **Marca:** Sunrise Taquitos, marca Tex-Mex familiar, *Est. 1988*.
- **Relación con Tierra Coffee:** son marcas independientes de la misma franquicia. **Este repo es solo de Sunrise Taquitos.**
- **Fase actual:** bases del proyecto. Sitio público mínimo (inicio y menú) sobre Clean Architecture; el menú aún no está conectado a Toast.
- **Stack:** Next.js 16 (App Router, Turbopack, Cache Components), React 19, TypeScript estricto, Tailwind CSS 4, Vitest. Node ≥ 24.
- **Alcance previsto:** sitio web con menú desde Toast POS, panel de administración, órdenes y programa de lealtad por fases.
- **Arquitectura:** lee `docs/arquitectura.md` antes de crear archivos en `src/`.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en `http://localhost:3000` |
| `npm run check` | Lint (incluye reglas de capas) + typecheck + tests. Córrelo antes de abrir un PR |
| `npm run build` | Build de producción |

## Mapa del repo

| Ruta | Contenido |
|---|---|
| `AGENTS.md` | Este archivo: reglas generales |
| `CLAUDE.md` | Importa este archivo para Claude Code |
| `.claude/skills/brand-sunrise/` | Skill de marca: se usa al diseñar o escribir UI y copy |
| `.claude/agents/` | Subagentes especializados (vacío por ahora) |
| `src/core/` | Dominio y casos de uso: TypeScript puro, sin Next.js ni React |
| `src/infrastructure/` | Adaptadores (repos estáticos hoy, Toast después) |
| `src/di/container.ts` | Composition root: conecta casos de uso con adaptadores |
| `src/presentation/` | Componentes de UI |
| `src/app/` | Rutas de Next.js |
| `docs/arquitectura.md` | Capas, regla de dependencias, caché y hoja de ruta de Toast |
| `docs/brand/` | Concepto, identidad visual, voz, inventario de assets y pendientes |
| `docs/referencias/` | Dónde están los archivos fuente (PDF, AI, PSD) |
| `brand-assets/` | Logos, íconos, frases, texturas, tokens y notas de fuentes, listos para usar en la web |

## Reglas

1. **Una marca por repo.** No uses colores, assets, fuentes ni copys de Tierra Coffee.
2. **Los tokens son la fuente de verdad.** Colores y tipografía salen de `brand-assets/tokens/`; no escribas valores hex sueltos en componentes.
3. **No alteres los logos.** Usa las variantes de `brand-assets/logos/` tal como están: sin recolorear, deformar ni agregar efectos. Respeta el tamaño mínimo (75.6 px) y el área libre.
4. **No inventes datos del negocio.** Precios, horarios, direcciones, teléfonos, años, cifras y testimonios deben venir del cliente. Si faltan, deja un `TODO:` visible.
5. **El copy sigue `docs/brand/03-voz-y-mensajes.md`:** cálido, cercano, honesto, con spanglish natural.
6. **Fuentes:** antes de agregar una, revisa `brand-assets/fonts/README.md`. No subas archivos de fuentes con licencia restringida.
7. **Accesibilidad:** mínimo WCAG AA. Aqua `#2ea589` sobre blanco no sirve para texto normal (contraste 3.06:1); ver `docs/brand/02-identidad-visual.md`.
8. **Performance y SEO son requisitos, no extras.** SVG optimizados, imágenes con `alt`, sin fuentes ni JS innecesarios.
9. **Flujo de trabajo:** todo cambio va en una rama y por Pull Request a `main`. No toques producción directamente.
10. **Credenciales:** las claves (Toast POS u otras) van en variables de entorno, nunca en el repo.
11. **Antes de asumir algo, revisa `docs/brand/05-pendientes.md`.** Si algo no está documentado, pregunta.
12. **Respeta las capas.** La UI consume casos de uso desde `@/di/container`; nunca importa `src/infrastructure/`. El core no importa Next.js ni React. ESLint lo hace cumplir: no desactives `no-restricted-imports`.
13. **Colores solo de la paleta de marca.** Tailwind tiene únicamente `crimson`, `charcoal`, `aqua` y `white` (se borró la paleta por defecto en `src/app/globals.css`).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
