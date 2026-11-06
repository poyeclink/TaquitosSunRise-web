/**
 * Fotos temporales de Unsplash (licencia gratuita: uso comercial sin atribución obligatoria).
 * Se reemplazan por fotos propias de la marca en cuanto el cliente las entregue
 * (docs/brand/05-pendientes.md). Créditos completos en docs/referencias/fotos-unsplash.md.
 *
 * `next/image` optimiza estas URLs; `next.config.ts` solo admite este tamaño fuente.
 */
export interface Photo {
  readonly src: string;
  readonly alt: string;
  /** Fotógrafo y página de la foto en Unsplash. */
  readonly credit: { readonly author: string; readonly url: string };
}

const SOURCE = "?w=2400&q=80&fm=jpg";

function unsplash(file: string, page: string, author: string, alt: string): Photo {
  return {
    src: `https://images.unsplash.com/${file}${SOURCE}`,
    alt,
    credit: { author, url: `https://unsplash.com/photos/${page}` },
  };
}

export const photos = {
  tacos: unsplash(
    "photo-1565299585323-38d6b0865b47",
    "lP5MCM6nZ5A",
    "Chad Montano",
    "Tacos recién servidos con verduras frescas y un toque de limón",
  ),
  breakfast: unsplash(
    "photo-1585975754487-25489eabf36a",
    "mkOpQDcFrx0",
    "Paul Hanaoka",
    "Desayuno con huevos estrellados, salsa y totopos",
  ),
  lunchTable: unsplash(
    "photo-1700625916627-16ad4fb0553c",
    "w9LdceJSEu8",
    "Hybrid Storytellers",
    "Mesa con tacos, guacamole y salsas sobre azulejos de colores",
  ),
  cateringTray: unsplash(
    "photo-1711306723534-d94adf3c2199",
    "jiYjMcTXzxs",
    "ALLAN LAINEZ",
    "Charola grande de tacos con salsas y guacamole para compartir",
  ),
  sunrise: unsplash(
    "photo-1762689744366-debe456d2f24",
    "gj5gJz6i9iw",
    "Michał Bielejewski",
    "Amanecer sobre un campo cubierto de rocío",
  ),
  dough: unsplash(
    "photo-1546853845-3145109496a8",
    "Mu5bsvdGvy8",
    "Dennis Schrader",
    "Manos amasando masa en la cocina",
  ),
  familyDinner: unsplash(
    "photo-1792778245399-fb62b899fb6c",
    "XuiZwrm8W14",
    "The Ridge Ohio",
    "Familia compartiendo la comida alrededor de una mesa",
  ),
  familyTable: unsplash(
    "photo-1683541606184-fecb068b26eb",
    "4q44RjJkeuM",
    "Sweet Life",
    "Varias generaciones de una familia comiendo juntas en una mesa de madera",
  ),
  tortillas: unsplash(
    "photo-1591266123515-46149ea0b0a9",
    "1zyj8nOdwPs",
    "micheile henderson",
    "Tortillas hechas a mano junto a un rodillo",
  ),
  sharedTable: unsplash(
    "photo-1731090390538-d814c9925232",
    "4kVK8ki1BMc",
    "Snappr",
    "Mesa de madera llena de platos Tex-Mex para compartir",
  ),
} satisfies Record<string, Photo>;
