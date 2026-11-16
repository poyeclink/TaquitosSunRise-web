import type { NextConfig } from "next";

const tailwind = ["@tailwindcss/turbopack"];
const cssModule = /\.module\.css$/;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // 75 es el valor por defecto (íconos, texturas); 90 se usa en las fotos para que
    // la segunda compresión de next/image sobre los WebP no deje artefactos.
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      // Tailwind procesa todo el CSS. Los `.module.css` necesitan su propia regla:
      // con `as: "*.css"` se convertían en CSS global y perdían el scope del módulo.
      "*.css": [
        { condition: { not: { path: cssModule } }, loaders: tailwind, as: "*.css" },
        { condition: { path: cssModule }, loaders: tailwind, as: "*.module.css" },
      ],
    },
  },
};

export default nextConfig;
