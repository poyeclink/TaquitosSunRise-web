import type { MenuRepository } from "@/core/application/menu/menu-repository";
import type { Menu } from "@/core/domain/menu/menu";

/**
 * Adaptador temporal mientras no hay conexión con Toast.
 * TODO: el menú y los precios vienen de Toast POS; no capturar platillos inventados aquí.
 * Cuando exista `ToastMenuRepository`, se cambia en `src/di/container.ts` y este archivo
 * queda solo para pruebas o desarrollo local.
 */
export class StaticMenuRepository implements MenuRepository {
  constructor(private readonly menu: Menu = { categories: [] }) {}

  async getMenu(): Promise<Menu> {
    return this.menu;
  }
}
