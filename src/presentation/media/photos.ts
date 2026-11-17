/**
 * Fotografía propia del negocio (brand-assets/fotos/, WebP desde los originales).
 * Se importan de forma estática: `next/image` conoce sus medidas y las optimiza por tamaño.
 * Inventario completo en docs/brand/04-inventario-assets.md.
 */
import type { StaticImageData } from "next/image";

import barbacoaPlate3 from "@brand/fotos/barbacoa-plate-3.webp";
import barbacoaTaco2 from "@brand/fotos/barbacoa-taco-2.webp";
import fajitaTaco from "@brand/fotos/fajita-taco.webp";
import rancheroPlate from "@brand/fotos/ranchero-plate.webp";
import comedorClientes from "@brand/fotos/dsc09002.webp";
import masaHoja from "@brand/fotos/dsc09053.webp";
import tamalesManos from "@brand/fotos/dsc09061.webp";
import cocineroGuiso from "@brand/fotos/dsc09078.webp";
import familiaNina from "@brand/fotos/dsc09256.webp";
import carneGuisada3 from "@brand/fotos/carne-guisada-3.webp";
import vistaAerea from "@brand/fotos/dji-0191.webp";
import interiorClientes from "@brand/fotos/dsc08996.webp";
import rellenoHojas from "@brand/fotos/dsc09064.webp";
import cocinaMasa from "@brand/fotos/dsc09097.webp";
import cocineraTortillas from "@brand/fotos/dsc09083.webp";
import cocineraAmasando from "@brand/fotos/dsc09102.webp";
import huevosSarten from "@brand/fotos/dsc09144.webp";
import platoDesayuno from "@brand/fotos/dsc09156.webp";
import comalTortilla from "@brand/fotos/dsc09201.webp";
import familiaMesa from "@brand/fotos/dsc09252.webp";
import clientasDesayuno from "@brand/fotos/dsc09257.webp";
import fachada from "@brand/fotos/dsc08990.webp";
import mesaCompartida from "@brand/fotos/dsc09266.webp";
import amigasMesa from "@brand/fotos/dsc09291.webp";
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
  interior: {
    src: interiorClientes,
    alt: "Interior de Sunrise Taquitos con paredes naranjas, mesas y clientes comiendo",
  },
  aerial: {
    src: vistaAerea,
    alt: "Vista aérea del local de Sunrise Taquitos y su estacionamiento",
  },
  kneading: {
    src: cocineraAmasando,
    alt: "Cocinera amasando en un bowl grande junto a una charola con bolitas de masa",
  },
  filling: {
    src: rellenoHojas,
    alt: "Cucharón sirviendo guiso rojo sobre masa extendida en hojas de maíz",
  },
  eggs: {
    src: huevosSarten,
    alt: "Huevos estrellados cocinándose en un sartén sobre la estufa",
  },
  breakfastPlate: {
    src: platoDesayuno,
    alt: "Plato de desayuno con huevos estrellados, frijoles y papas sobre una charola",
  },
  friends: {
    src: amigasMesa,
    alt: "Dos clientas sonriendo en una mesa con tacos, salsas y refrescos",
  },
  regulars: {
    src: clientasDesayuno,
    alt: "Clientas compartiendo platos de desayuno en una mesa del restaurante",
  },
  barbacoaTaco: {
    src: barbacoaTaco2,
    alt: "Taco de barbacoa con cilantro y cebolla sobre una tortilla de harina",
  },
  fajitaTaco: {
    src: fajitaTaco,
    alt: "Tacos de fajita en canasta con papel a cuadros, junto a salsas y un refresco",
  },
  rancheroPlate: {
    src: rancheroPlate,
    alt: "Plato ranchero con huevos, salsa, carne, papas, frijoles y tortilla de harina",
  },
  dining: {
    src: comedorClientes,
    alt: "Clientes comiendo en el comedor de Sunrise Taquitos, de paredes naranjas con cuadros",
  },
  masaHusk: {
    src: masaHoja,
    alt: "Mano con guante sosteniendo una hoja de maíz con masa, junto a un bowl de masa",
  },
  tamales: {
    src: tamalesManos,
    alt: "Manos con guantes extendiendo masa sobre hojas de maíz para preparar tamales",
  },
  cookStir: {
    src: cocineroGuiso,
    alt: "Cocinero revolviendo un guiso en la estufa de la cocina",
  },
  familyKid: {
    src: familiaNina,
    alt: "Familia con una niña pequeña comiendo en una mesa del restaurante",
  },
} satisfies Record<string, Photo>;
