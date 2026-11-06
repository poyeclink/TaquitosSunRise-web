# Arquitectura — Sunrise Taquitos Web

Next.js 16 (App Router, Turbopack, Cache Components) + TypeScript estricto + Tailwind CSS 4, organizado con **Clean Architecture**.

## Por qué

El objetivo final es que el menú y las órdenes vivan en **Toast POS**. Si la lógica del sitio depende directamente de la API de Toast, cualquier cambio en Toast (o cambiar de POS) obliga a reescribir la UI. Con capas, Toast es solo un **adaptador**: se conecta en un lugar y el resto del código no se entera.

## Capas y regla de dependencias

Las dependencias apuntan **hacia adentro**. Una capa interna nunca importa una externa.

```
app (rutas Next.js) ──► di (composition root) ──► infrastructure ──► application ──► domain
        │                                                                 ▲              ▲
        └──────────────► presentation (componentes UI) ───────────────────┴──────────────┘
```

| Capa | Carpeta | Qué contiene | Puede importar |
|---|---|---|---|
| **Domain** | `src/core/domain/` | Entidades, value objects y reglas de negocio puras (`Menu`, `Money`, `toPublicMenu`) | Nada (ni Next, ni React) |
| **Application** | `src/core/application/` | Casos de uso (`GetPublicMenu`) y **puertos** (interfaces como `MenuRepository`) | `domain` |
| **Infrastructure** | `src/infrastructure/` | Implementaciones de los puertos: repos estáticos hoy, Toast, base de datos, etc. | `domain`, `application`, Next (`use cache`, `fetch`) |
| **DI** | `src/di/container.ts` | Composition root: elige qué implementación usa cada caso de uso. Solo servidor (`server-only`) | Todo lo anterior |
| **Presentation** | `src/presentation/` | Componentes y formateadores de UI. Reciben datos por props | `domain` (tipos) |
| **App** | `src/app/` | Rutas, layouts, metadata, Route Handlers y Server Actions. Llama casos de uso desde `@/di/container` | `di`, `presentation`, `domain` |

La regla se **hace cumplir con ESLint** (`no-restricted-imports` en `eslint.config.mjs`). Si alguien importa infraestructura desde una página, o Next.js desde el dominio, `npm run lint` falla con un mensaje que explica qué hacer.

## Flujo de una petición

`/menu` → `app/(site)/menu/page.tsx` → `getPublicMenu.execute()` (de `di/container`) → `MenuRepository.getMenu()` (hoy `StaticMenuRepository`) → `toPublicMenu()` aplica reglas → `<MenuView menu={…} />` renderiza.

## Estructura

```
src/
  app/
    layout.tsx            # html, fuente League Spartan, metadata global
    globals.css           # Tailwind + tokens de marca
    icon.svg, apple-icon.png
    (site)/               # sitio público: header + footer
      page.tsx            # inicio: hero, misión, visión
      menu/page.tsx
    # Próximamente: (admin)/ para el panel, api/webhooks/toast/route.ts
  core/
    domain/{shared,menu,restaurant}/
    application/{menu,restaurant}/
  infrastructure/{menu,restaurant}/
  di/container.ts
  presentation/{components,format}/
```

Alias: `@/*` → `src/*` y `@brand/*` → `brand-assets/*`. Los logos y frases se importan directo desde `brand-assets` (sin copiarlos a `public/`), así hay una sola copia de cada archivo.

## Cómo agregar una funcionalidad

1. **Domain:** modela la entidad y sus reglas puras. Agrega tests junto al archivo (`*.test.ts`).
2. **Application:** define el puerto (interface) y el caso de uso que lo consume.
3. **Infrastructure:** implementa el puerto.
4. **DI:** conecta la implementación en `src/di/container.ts`.
5. **App / Presentation:** la ruta llama al caso de uso y pasa el resultado a un componente.

## Caché y renderizado

`cacheComponents` está activo. Hoy todas las rutas se prerenderizan como estáticas. Cuando los datos vengan de Toast:

- `'use cache'` + `cacheLife()` + `cacheTag('menu')` van **en el adaptador de infraestructura** (es una directiva de Next.js, no pertenece al core).
- Un webhook de Toast (`app/api/webhooks/toast/route.ts`) llamará a `revalidateTag('menu')` para refrescar el menú sin redeploy.
- Lo que dependa de la petición (sesión del admin, carrito) va dentro de `<Suspense>`.

Antes de usar una API de Next.js, revisa la guía en `node_modules/next/dist/docs/`: esta versión cambia bastante respecto a Next 13–15.

## Hoja de ruta de Toast POS

| Fase | Qué | Cambio en el código |
|---|---|---|
| 1 · Bases (actual) | Sitio, menú vacío con `TODO`, perfil del restaurante | — |
| 2 · Menú desde Toast | Leer menú y precios de la API de menús de Toast | `ToastMenuRepository` + cliente HTTP con autenticación en `infrastructure/toast/`; mapeo Toast → dominio; cambio en `di/container.ts` |
| 3 · Panel de administración | Login del dueño; disponibilidad, fotos y descripciones | Grupo de rutas `(admin)`, Server Actions, nuevos casos de uso |
| 4 · Órdenes | Carrito y envío de órdenes a Toast | Entidad `Order`, puerto `OrderGateway`, adaptador de la API de órdenes de Toast |

Las credenciales van en variables de entorno (ver `.env.example`). Acceso a la API pendiente: `docs/brand/05-pendientes.md`.
