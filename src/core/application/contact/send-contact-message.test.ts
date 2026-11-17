import { describe, expect, it, vi } from "vitest";
import type { ContactInbox } from "@/core/application/contact/contact-inbox";
import { SendContactMessage } from "@/core/application/contact/send-contact-message";

const input = { name: "Ana", reply: "ana@example.com", topic: "general", message: "Hola, ¿abren temprano?" };

describe("SendContactMessage", () => {
  it("no toca el buzón si el mensaje es inválido", async () => {
    const inbox: ContactInbox = { deliver: vi.fn() };
    const result = await new SendContactMessage(inbox).execute({ ...input, reply: "" });
    expect(result).toEqual({ status: "invalid", errors: { reply: "required" } });
    expect(inbox.deliver).not.toHaveBeenCalled();
  });

  it("entrega el mensaje validado", async () => {
    const inbox: ContactInbox = { deliver: vi.fn(async () => "delivered" as const) };
    await expect(new SendContactMessage(inbox).execute(input)).resolves.toEqual({ status: "sent" });
    expect(inbox.deliver).toHaveBeenCalledWith(input);
  });

  it("avisa cuando el canal no está disponible", async () => {
    const inbox: ContactInbox = { deliver: async () => "unavailable" };
    await expect(new SendContactMessage(inbox).execute(input)).resolves.toEqual({ status: "unavailable" });
  });
});
