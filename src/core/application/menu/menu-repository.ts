import type { Menu } from "@/core/domain/menu/menu";

/**
 * Puerto: de dónde sale el menú. Hoy lo implementa un repositorio estático;
 * en la fase de integración lo implementará un adaptador de Toast POS.
 */
export interface MenuRepository {
  getMenu(): Promise<Menu>;
}
