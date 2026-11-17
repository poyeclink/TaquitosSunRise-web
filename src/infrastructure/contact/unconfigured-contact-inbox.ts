import type { ContactInbox } from "@/core/application/contact/contact-inbox";

/**
 * TODO: conectar el canal real (correo transaccional, CRM o Toast) cuando el cliente
 * confirme a dónde deben llegar los mensajes (docs/brand/05-pendientes.md).
 * Las credenciales irán en variables de entorno, nunca en el repo.
 *
 * Mientras tanto no finge un envío: responde "unavailable" y la página ofrece
 * llamar o visitar el local, para que ningún mensaje se pierda en silencio.
 */
export class UnconfiguredContactInbox implements ContactInbox {
  async deliver(): Promise<"unavailable"> {
    return "unavailable";
  }
}
