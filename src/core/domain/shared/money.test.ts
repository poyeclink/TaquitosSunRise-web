import { describe, expect, it } from "vitest";
import { createMoney, InvalidMoneyError } from "@/core/domain/shared/money";

describe("createMoney", () => {
  it("acepta centavos enteros", () => {
    expect(createMoney(1250)).toEqual({ amountInCents: 1250, currency: "USD" });
  });

  it.each([-1, 12.5, Number.NaN])("rechaza %s", (value) => {
    expect(() => createMoney(value)).toThrow(InvalidMoneyError);
  });
});
