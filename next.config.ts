import type { NextConfig } from "next";

const tailwind = ["@tailwindcss/turbopack"];
const cssModule = /\.module\.css$/;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Fotos temporales de Unsplash hasta tener las propias de la marca.
    // Solo se permite el tamaño fuente fijo de `src/presentation/media/unsplash.ts`.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*", search: "?w=2400&q=80&fm=jpg" },
    ],
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
