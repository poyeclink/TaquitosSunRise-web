import type { ContactInbox } from "@/core/application/contact/contact-inbox";
import { validateContactMessage, type ContactErrors } from "@/core/domain/contact/contact-message";

export type SendContactResult =
  | { readonly status: "sent" }
  | { readonly status: "invalid"; readonly errors: ContactErrors }
  | { readonly status: "unavailable" };

/** Caso de uso: validar un mensaje de contacto y entregarlo. */
export class SendContactMessage {
  constructor(private readonly inbox: ContactInbox) {}

  async execute(input: Record<string, unknown>): Promise<SendContactResult> {
    const result = validateContactMessage(input);
    if (!result.ok) return { status: "invalid", errors: result.errors };

    const outcome = await this.inbox.deliver(result.value);
    return outcome === "delivered" ? { status: "sent" } : { status: "unavailable" };
  }
}
