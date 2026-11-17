/**
 * Datos de contacto. `null` = el cliente aún no los ha entregado
 * (ver docs/brand/05-pendientes.md). La UI debe mostrar un TODO visible, nunca inventarlos.
 */
export interface ContactInfo {
  readonly address: string | null;
  readonly phone: string | null;
  readonly hours: string | null;
}

/** Un momento de la historia del negocio. Cada campo en `null` es un dato pendiente del cliente. */
export interface Milestone {
  readonly year: string | null;
  readonly title: string | null;
  readonly text: string | null;
}

export interface RestaurantProfile {
  readonly name: string;
  readonly tagline: string;
  readonly foundedYear: number;
  readonly mission: string;
  readonly vision: string;
  readonly pillars: readonly string[];
  readonly contact: ContactInfo;
  /** Línea de tiempo de "Nosotros", en orden cronológico. */
  readonly milestones: readonly Milestone[];
  /** Historia de quienes fundaron el negocio. */
  readonly foundersStory: string | null;
}
