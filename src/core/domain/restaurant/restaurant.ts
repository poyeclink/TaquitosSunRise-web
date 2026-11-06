/**
 * Datos de contacto. `null` = el cliente aún no los ha entregado
 * (ver docs/brand/05-pendientes.md). La UI debe mostrar un TODO visible, nunca inventarlos.
 */
export interface ContactInfo {
  readonly address: string | null;
  readonly phone: string | null;
  readonly hours: string | null;
}

export interface RestaurantProfile {
  readonly name: string;
  readonly tagline: string;
  readonly foundedYear: number;
  readonly mission: string;
  readonly vision: string;
  readonly pillars: readonly string[];
  readonly contact: ContactInfo;
}
