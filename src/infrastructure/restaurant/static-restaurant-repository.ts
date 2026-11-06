import type { RestaurantRepository } from "@/core/application/restaurant/restaurant-repository";
import type { RestaurantProfile } from "@/core/domain/restaurant/restaurant";

/**
 * Contenido institucional tomado de docs/brand/01-concepto.md (Brand Guidelines, ago 2026).
 * Más adelante podrá editarse desde el panel de administración (otro adaptador, misma interfaz).
 */
const PROFILE: RestaurantProfile = {
  name: "Sunrise Taquitos",
  tagline: "Good taquitos, good days. The homemade way.",
  foundedYear: 1988,
  mission:
    "Brindar comida Tex-Mex hecha con cariño que acompañe el ritmo del día de las personas, creando experiencias cálidas, accesibles y familiares donde cada visita se sienta cercana, auténtica y hecha en casa.",
  vision:
    "Convertirse en una marca referente de comida familiar y hecha como en casa, reconocida por transformar pequeños rituales diarios en momentos memorables mediante una experiencia cercana, optimista y construida desde la comunidad.",
  pillars: ["Fe", "Servir", "Familia"],
  // TODO: datos pendientes del cliente (docs/brand/05-pendientes.md).
  contact: { address: null, phone: null, hours: null },
};

export class StaticRestaurantRepository implements RestaurantRepository {
  async getProfile(): Promise<RestaurantProfile> {
    return PROFILE;
  }
}
