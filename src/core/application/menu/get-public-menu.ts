import { toPublicMenu, type Menu } from "@/core/domain/menu/menu";
import type { MenuRepository } from "@/core/application/menu/menu-repository";

/** Caso de uso: menú que ve el público en el sitio. */
export class GetPublicMenu {
  constructor(private readonly menus: MenuRepository) {}

  async execute(): Promise<Menu> {
    return toPublicMenu(await this.menus.getMenu());
  }
}
