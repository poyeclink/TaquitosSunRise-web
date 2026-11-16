/**
 * Fotografía propia del negocio (brand-assets/fotos/, WebP desde los originales).
 * Se importan de forma estática: `next/image` conoce sus medidas y las optimiza por tamaño.
 * Inventario completo en docs/brand/04-inventario-assets.md.
 */
import type { StaticImageData } from "next/image";

import barbacoaPlate3 from "@brand/fotos/barbacoa-plate-3.webp";
import carneGuisada3 from "@brand/fotos/carne-guisada-3.webp";
import cocinaMasa from "@brand/fotos/dsc09097.webp";
import cocineraTortillas from "@brand/fotos/dsc09083.webp";
import comalTortilla from "@brand/fotos/dsc09201.webp";
import familiaMesa from "@brand/fotos/dsc09252.webp";
import fachada from "@brand/fotos/dsc08990.webp";
import mesaCompartida from "@brand/fotos/dsc09266.webp";
import flatlay from "@brand/fotos/flatlay.webp";
import tacoSalsa from "@brand/fotos/dsc09286.webp";

export interface Photo {
  readonly src: StaticImageData;
  readonly alt: string;
}

export const photos = {
  tacos: {
    src: tacoSalsa,
    alt: "Salsa verde cayendo sobre un taco de carne, huevo y queso envuelto en papel aluminio",
  },
  breakfast: {
    src: barbacoaPlate3,
    alt: "Plato de desayuno con huevo, salsa, barbacoa, papas, frijoles y tortilla de harina",
  },
  lunchTable: {
    src: carneGuisada3,
    alt: "Plato de carne guisada con arroz, frijoles y ensalada",
  },
  cateringTray: {
    src: flatlay,
    alt: "Mesa vista desde arriba con tacos, platos y salsas para compartir",
  },
  sunrise: {
    src: fachada,
    alt: "Fachada de Sunrise Taquitos con su letrero bajo el cielo azul",
  },
  dough: {
    src: cocinaMasa,
    alt: "Manos con guantes formando bolitas de masa para tortillas",
  },
  familyDinner: {
    src: familiaMesa,
    alt: "Familia con una niña pequeña compartiendo la comida en una mesa del restaurante",
  },
  familyTable: {
    src: cocineraTortillas,
    alt: "Cocinera sonriendo mientras prepara la masa de las tortillas",
  },
  tortillas: {
    src: comalTortilla,
    alt: "Tortillas de harina cociéndose en el comal",
  },
  sharedTable: {
    src: mesaCompartida,
    alt: "Clientas comiendo y conversando alrededor de una mesa con platos y bebidas",
  },
} satisfies Record<string, Photo>;
