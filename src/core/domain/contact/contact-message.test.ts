import { describe, expect, it } from "vitest";
import { isValidReply, validateContactMessage } from "@/core/domain/contact/contact-message";

const valid = {
  name: "  Ana   López ",
  reply: "ana@example.com",
  topic: "catering",
  message: "Hola, quisiera información.\nGracias.",
};

describe("validateContactMessage", () => {
  it("acepta un mensaje válido y normaliza espacios", () => {
    expect(validateContactMessage(valid)).toEqual({
      ok: true,
      value: { name: "Ana López", reply: "ana@example.com", topic: "catering", message: "Hola, quisiera información.\nGracias." },
    });
  });

  it("marca campos vacíos o con tipos inesperados como requeridos", () => {
    expect(validateContactMessage({ name: 42 })).toEqual({
      ok: false,
      errors: { name: "required", reply: "required", topic: "required", message: "required" },
    });
  });

  it("revisa largos, motivo y forma de respuesta", () => {
    const result = validateContactMessage({ name: "A", reply: "hola", topic: "otro", message: "x".repeat(1001) });
    expect(result).toEqual({
      ok: false,
      errors: { name: "too-short", reply: "invalid", topic: "invalid", message: "too-long" },
    });
  });
});

describe("isValidReply", () => {
  it.each(["ana@example.com", "(210) 555-0123", "+52 81 1234 5678"])("acepta %s", (value) => {
    expect(isValidReply(value)).toBe(true);
  });

  it.each(["ana@", "123", "llámame", "555-0123-555-0123-99"])("rechaza %s", (value) => {
    expect(isValidReply(value)).toBe(false);
  });
});
