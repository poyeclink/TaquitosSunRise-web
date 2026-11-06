import { describe, expect, it } from "vitest";
import { GetPublicMenu } from "@/core/application/menu/get-public-menu";
import type { MenuRepository } from "@/core/application/menu/menu-repository";
import { createMoney } from "@/core/domain/shared/money";

describe("GetPublicMenu", () => {
  it("aplica las reglas públicas sobre lo que entrega el repositorio", async () => {
    const repo: MenuRepository = {
      getMenu: async () => ({
        categories: [
          {
            id: "c1",
            name: "Categoría de prueba",
            sortOrder: 0,
            items: [
              { id: "a", name: "A", price: createMoney(100), isAvailable: false, sortOrder: 0 },
            ],
          },
        ],
      }),
    };

    await expect(new GetPublicMenu(repo).execute()).resolves.toEqual({ categories: [] });
  });
});
