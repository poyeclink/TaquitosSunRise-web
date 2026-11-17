"use server";

import { sendContactMessage } from "@/di/container";
import type { ContactFormState } from "@/presentation/components/contact/contact-form";

const field = (formData: FormData, name: string) => {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
};

/**
 * Server Action del formulario de contacto. Es un endpoint público: no confía en la
 * validación del navegador (el caso de uso vuelve a validar) y no devuelve datos sensibles.
 */
export async function submitContact(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Trampa para bots: si llenaron el campo oculto, se responde como enviado sin hacer nada.
  if (field(formData, "website")) return { status: "sent" };

  const result = await sendContactMessage.execute({
    name: field(formData, "name"),
    reply: field(formData, "reply"),
    topic: field(formData, "topic"),
    message: field(formData, "message"),
  });

  return result.status === "invalid" ? { status: "invalid", errors: result.errors } : { status: result.status };
}
