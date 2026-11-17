/**
 * Mensaje del formulario de contacto y sus reglas. TypeScript puro: la UI traduce los
 * códigos de error a texto y la infraestructura decide a dónde se envía.
 */

/** Motivos del mensaje. "catering" es un servicio documentado de la marca. */
export const CONTACT_TOPICS = ["general", "catering", "comentarios"] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export interface ContactMessage {
  readonly name: string;
  /** Correo o teléfono: la persona elige cómo prefiere que le respondan. */
  readonly reply: string;
  readonly topic: ContactTopic;
  readonly message: string;
}

export type ContactField = keyof ContactMessage;
export type ContactError = "required" | "too-short" | "too-long" | "invalid";
export type ContactErrors = Partial<Record<ContactField, ContactError>>;

export type ContactValidation =
  | { readonly ok: true; readonly value: ContactMessage }
  | { readonly ok: false; readonly errors: ContactErrors };

export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  message: { min: 10, max: 1000 },
} as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Teléfono: dígitos con espacios, guiones, puntos, paréntesis o "+"; entre 7 y 15 dígitos. */
const PHONE_CHARS = /^\+?[\d\s().-]+$/;

const text = (value: unknown) => (typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "");

export function isValidReply(value: string): boolean {
  if (EMAIL.test(value)) return true;
  const digits = value.replace(/\D/g, "").length;
  return PHONE_CHARS.test(value) && digits >= 7 && digits <= 15;
}

function lengthError(value: string, { min, max }: { min: number; max: number }): ContactError | undefined {
  if (!value) return "required";
  if (value.length < min) return "too-short";
  if (value.length > max) return "too-long";
  return undefined;
}

/** Valida datos sin confiar en su forma (vienen de un formulario). */
export function validateContactMessage(input: Record<string, unknown>): ContactValidation {
  const name = text(input.name);
  const reply = text(input.reply);
  const topic = text(input.topic);
  // El mensaje conserva sus saltos de línea; solo se recortan los extremos.
  const message = typeof input.message === "string" ? input.message.trim() : "";

  const errors: ContactErrors = {};
  const nameError = lengthError(name, CONTACT_LIMITS.name);
  if (nameError) errors.name = nameError;
  if (!reply) errors.reply = "required";
  else if (!isValidReply(reply)) errors.reply = "invalid";
  if (!CONTACT_TOPICS.includes(topic as ContactTopic)) errors.topic = topic ? "invalid" : "required";
  const messageError = lengthError(message, CONTACT_LIMITS.message);
  if (messageError) errors.message = messageError;

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value: { name, reply, topic: topic as ContactTopic, message } };
}
