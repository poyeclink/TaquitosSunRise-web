/**
 * Copy y assets de "Contacto". El texto sigue docs/brand/03-voz-y-mensajes.md.
 * Los datos del negocio (dirección, teléfono, horario) llegan por props desde el perfil;
 * si faltan, la UI muestra un TODO visible.
 */
import type { ContactError, ContactField, ContactTopic } from "@/core/domain/contact/contact-message";
import type { Lettering } from "@/presentation/components/home/home-content";
import { photos } from "@/presentation/media/photos";

import fraseHaveAGreatDia from "@brand/frases/frase-have-a-great-dia-full-color.svg";
import fraseTuCasaAlways from "@brand/frases/frase-tu-casa-always-rojo.svg";

import iconoAguacate from "@brand/iconos/icono-aguacate.svg";
import iconoCaja from "@brand/iconos/icono-caja.svg";
import iconoChile from "@brand/iconos/icono-chile.svg";
import iconoCuchara from "@brand/iconos/icono-cuchara.svg";
import iconoSol from "@brand/iconos/icono-sol.svg";
import iconoSombrero from "@brand/iconos/icono-sombrero.svg";
import iconoTaco from "@brand/iconos/icono-taco.svg";
import iconoTaza from "@brand/iconos/icono-taza.svg";

import isotipoBlanco from "@brand/logos/svg/isotipo-blanco.svg";
import texturaCrimson from "@brand/texturas/textura-crimson.svg";

export const contactHero = {
  eyebrow: "Contacto",
  title: ["Hablemos,", "como en familia."],
  lead: "¿Una pregunta, un pedido para tu equipo o simplemente un saludo? Escríbenos, llámanos o ven a visitarnos: aquí siempre hay lugar para ti.",
  /** "Pregúntanos por…" + palabra que rota (servicios documentados de la marca). */
  askPrefix: "Pregúntanos por",
  askWords: ["desayunos", "almuerzos", "catering", "tu próxima reunión"],
  texture: texturaCrimson,
  isotipo: isotipoBlanco,
  /** Texto que gira alrededor del sello. */
  ring: "Escríbenos · Llámanos · Visítanos · ",
  floaters: [
    { src: iconoTaco, position: "left-[0%] top-[14%]", size: "size-16", depth: 22 },
    { src: iconoAguacate, position: "right-[2%] top-[2%]", size: "size-14", depth: -18 },
    { src: iconoChile, position: "bottom-[4%] right-[6%]", size: "size-16", depth: 26 },
  ],
};

/** Tarjetas rápidas bajo el hero. `key` indica qué dato del perfil muestran. */
export const quickCards = [
  { key: "phone", label: "Llámanos", icon: iconoTaza, todo: "teléfono del cliente" },
  { key: "address", label: "Visítanos", icon: iconoSombrero, todo: "dirección del cliente" },
  { key: "hours", label: "Horario", icon: iconoSol, todo: "horario del cliente" },
] as const;

export const formCopy = {
  eyebrow: "Escríbenos",
  title: "Cuéntanos qué necesitas",
  lead: "Déjanos tus datos y tu mensaje. Con gusto te atendemos, como en casa.",
  topics: [
    { value: "general", label: "Pregunta general", icon: iconoTaza },
    { value: "catering", label: "Catering", icon: iconoCaja },
    { value: "comentarios", label: "Comentarios", icon: iconoCuchara },
  ] satisfies readonly { value: ContactTopic; label: string; icon: typeof iconoTaza }[],
  labels: {
    topic: "¿En qué te ayudamos?",
    name: "Tu nombre",
    reply: "Correo o teléfono",
    replyHint: "Para poder responderte.",
    message: "Tu mensaje",
  },
  /** Frases para empezar el mensaje con un toque, según el motivo elegido. */
  starters: {
    general: ["Hola, quisiera saber…", "¿Me pueden ayudar con…?"],
    catering: ["Quisiera cotizar catering para [número] personas.", "La fecha sería el [día].", "Es para una reunión de trabajo."],
    comentarios: ["Quiero felicitar al equipo por…", "Tengo una sugerencia:"],
  } satisfies Record<ContactTopic, readonly string[]>,
  startersLabel: "Ideas para empezar",
  progress: {
    icon: iconoSol,
    label: (done: number, total: number) => `${done} de ${total} listos`,
    ready: "¡Todo listo para enviar!",
  },
  submit: "Enviar mensaje",
  sending: "Enviando…",
  success: {
    lettering: { src: fraseHaveAGreatDia, alt: "Have a great día" } satisfies Lettering,
    title: "¡Gracias por escribirnos!",
    text: "Recibimos tu mensaje. Te responderemos por el medio que nos dejaste.",
    again: "Enviar otro mensaje",
  },
  unavailable: {
    title: "Por ahora el formulario no está activo",
    text: "Tu mensaje no se envió. Mientras lo conectamos, llámanos o visítanos y con gusto te atendemos.",
    todo: "conectar el formulario a un correo o CRM del cliente",
  },
};

/** Texto de cada error de validación (los códigos vienen del dominio). */
export const errorText: Record<ContactField, Partial<Record<ContactError, string>>> = {
  name: {
    required: "Escribe tu nombre.",
    "too-short": "Tu nombre se ve muy corto.",
    "too-long": "Usa máximo 80 caracteres.",
  },
  reply: {
    required: "Déjanos un correo o teléfono para responderte.",
    invalid: "Revisa el correo o el teléfono.",
  },
  topic: { required: "Elige un motivo.", invalid: "Elige un motivo." },
  message: {
    required: "Cuéntanos en qué te ayudamos.",
    "too-short": "Escribe un poquito más (mínimo 10 caracteres).",
    "too-long": "Usa máximo 1000 caracteres.",
  },
};

export const visitCard = {
  title: "Te esperamos",
  photo: photos.dining,
  lettering: { src: fraseTuCasaAlways, alt: "Tu casa always" } satisfies Lettering,
};

export const location = {
  eyebrow: "Encuéntranos",
  title: "Pasa a desayunar",
  photo: photos.aerial,
  facade: photos.sunrise,
  directions: "Cómo llegar",
  /** Etiqueta del pin que señala el local en la foto aérea. */
  pin: "Aquí estamos",
  pinIcon: iconoTaco,
};

export const catering = {
  eyebrow: "Catering",
  title: "¿Un evento, una reunión o tu equipo de trabajo?",
  text: "Con nuestro servicio de catering, el sabor de casa llega a tu mesa para compartir.",
  cta: "Armar mi mensaje",
  /** Planificador: arma un borrador del mensaje (no promete precios ni mínimos). */
  planner: {
    title: "Arma tu cotización",
    eventLabel: "Tipo de evento",
    events: [
      { label: "Reunión de trabajo", phrase: "una reunión de trabajo" },
      { label: "Celebración familiar", phrase: "una celebración familiar" },
      { label: "Otro evento", phrase: "un evento" },
    ],
    guestsLabel: "Personas (aprox.)",
    guests: { min: 5, max: 150, step: 5, initial: 25 },
    preview: "Así quedará tu mensaje:",
    message: (phrase: string, guests: number, max: number) =>
      `Hola, quisiera cotizar catering para ${phrase} de aproximadamente ${guests}${guests >= max ? " o más" : ""} personas.`,
  },
  photo: photos.cateringTray,
  icon: iconoCaja,
  todo: "detalles del catering: menú, mínimo de personas y anticipación",
};
