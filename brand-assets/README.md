# brand-assets — Sunrise Taquitos

Recursos de marca listos para la web. El inventario completo está en `docs/brand/04-inventario-assets.md` y las reglas de uso en `docs/brand/02-identidad-visual.md`.

En el proyecto Next.js se importan directo con el alias `@brand/*`, sin copiarlos a `public/`:

```tsx
import Image from "next/image";
import logo from "@brand/logos/svg/logo-principal-full-color.svg";

<Image src={logo} alt="Sunrise Taquitos" className="h-auto w-20" />
```

`tokens/tokens.css` se importa en `src/app/globals.css`. Las únicas copias son los íconos de la app (`src/app/icon.svg` y `src/app/apple-icon.png`, del isotipo rojo), porque Next.js los exige en esa carpeta.
