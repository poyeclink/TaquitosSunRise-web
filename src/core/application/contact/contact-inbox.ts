import type { ContactMessage } from "@/core/domain/contact/contact-message";

/**
 * Puerto: a dónde llegan los mensajes de contacto (correo, CRM, Toast…).
 * "unavailable" = el canal aún no está configurado o falló; la UI ofrece otras vías.
 */
export interface ContactInbox {
  deliver(message: ContactMessage): Promise<"delivered" | "unavailable">;
}
