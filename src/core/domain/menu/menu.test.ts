import { describe, expect, it } from "vitest";
import { toPublicMenu, type MenuItem } from "@/core/domain/menu/menu";
import { createMoney } from "@/core/domain/shared/money";

// Datos de prueba ficticios: solo validan la regla, no son el menú real.
const item = (id: string, sortOrder: number, isAvailable = true): MenuItem => ({
  id,
  name: `Item ${id}`,
  price: createMoney(100),
  isAvailable,
  sortOrder,
});

describe("toPublicMenu", () => {
  it("oculta platillos no disponibles y ordena por sortOrder", () => {
    const menu = toPublicMenu({
      categories: [
        { id: "c1", name: "A", sortOrder: 0, items: [item("b", 2), item("x", 0, false), item("a", 1)] },
      ],
    });

    expect(menu.categories[0].items.map((i) => i.id)).toEqual(["a", "b"]);
  });

  it("elimina categorías vacías y ordena categorías", () => {
    const menu = toPublicMenu({
      categories: [
        { id: "c2", name: "B", sortOrder: 2, items: [item("1", 0)] },
        { id: "empty", name: "Vacía", sortOrder: 0, items: [item("2", 0, false)] },
        { id: "c1", name: "A", sortOrder: 1, items: [item("3", 0)] },
      ],
    });

    expect(menu.categories.map((c) => c.id)).toEqual(["c1", "c2"]);
  });
});
