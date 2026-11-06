import type { Money } from "@/core/domain/shared/money";

/**
 * Modelo del menú independiente de Toast. La forma (menú → categorías → platillos)
 * se parece a la de Toast (menus → menuGroups → menuItems) para que el mapeo sea directo,
 * pero ningún tipo de Toast entra al dominio.
 */
export interface MenuItem {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly price: Money;
  readonly imageUrl?: string;
  readonly isAvailable: boolean;
  readonly sortOrder: number;
}

export interface MenuCategory {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly sortOrder: number;
  readonly items: readonly MenuItem[];
}

export interface Menu {
  readonly categories: readonly MenuCategory[];
}

const bySortOrder = (a: { sortOrder: number }, b: { sortOrder: number }) =>
  a.sortOrder - b.sortOrder;

/**
 * Regla de negocio: el público solo ve platillos disponibles, en orden,
 * y nunca una categoría vacía.
 */
export function toPublicMenu(menu: Menu): Menu {
  const categories = menu.categories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => item.isAvailable).sort(bySortOrder),
    }))
    .filter((category) => category.items.length > 0)
    .sort(bySortOrder);

  return { categories };
}
