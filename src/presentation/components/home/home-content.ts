/**
 * Copy y assets del home. Todo el texto sale de docs/brand/ (concepto, voz y manifiesto).
 * No agregar aquí datos del negocio (precios, horarios, direcciones): esos vienen del cliente.
 */
import type { StaticImageData } from "next/image";
import { photos, type Photo } from "@/presentation/media/unsplash";

import fraseFromOurCocina from "@brand/frases/frase-from-our-cocina-full-color.svg";
import fraseGoodTaquitosBlanco from "@brand/frases/frase-good-taquitos-good-days-blanco.svg";
import fraseHaveAGreatDia from "@brand/frases/frase-have-a-great-dia-full-color.svg";
import fraseHechoConFe from "@brand/frases/frase-hecho-con-fe-rojo.svg";
import fraseHomeMade from "@brand/frases/frase-home-made-good-food-full-color.svg";
import fraseBreakfastTaco from "@brand/frases/frase-home-of-the-breakfast-taco-full-color.svg";
import fraseMadeWithCarino from "@brand/frases/frase-made-with-carino-full-color.svg";
import fraseTasteLikeFamilia from "@brand/frases/frase-sunrise-taste-like-familia-full-color.svg";
import fraseTuCasaAlways from "@brand/frases/frase-tu-casa-always-rojo.svg";

import iconoAguacate from "@brand/iconos/icono-aguacate.svg";
import iconoCaja from "@brand/iconos/icono-caja.svg";
import iconoChile from "@brand/iconos/icono-chile.svg";
import iconoDesayuno from "@brand/iconos/icono-desayuno.svg";
import iconoFuego from "@brand/iconos/icono-fuego.svg";
import iconoHuevo from "@brand/iconos/icono-huevo.svg";
import iconoLimon from "@brand/iconos/icono-limon.svg";
import iconoMoler from "@brand/iconos/icono-moler.svg";
import iconoPlato from "@brand/iconos/icono-plato.svg";
import iconoSol from "@brand/iconos/icono-sol.svg";
import iconoSombrero from "@brand/iconos/icono-sombrero.svg";
import iconoTaco from "@brand/iconos/icono-taco.svg";
import iconoTaza from "@brand/iconos/icono-taza.svg";

import isotipoRojo from "@brand/logos/svg/isotipo-rojo.svg";
import texturaCrimson from "@brand/texturas/textura-crimson.svg";

export interface Lettering {
  readonly src: StaticImageData;
  readonly alt: string;
}

export const hero = {
  eyebrow: "Est. 1988 · Tex-Mex familiar",
  title: { src: fraseGoodTaquitosBlanco, alt: "Good taquitos, good days" } satisfies Lettering,
  lead: "Desayunos y almuerzos Tex-Mex hechos en casa y servidos con cariño, para acompañar el ritmo de tu día.",
  tagline: "The homemade way.",
  /** Lo que ofrece la marca (docs/brand/01-concepto.md). */
  services: ["Desayunos", "Almuerzos", "Catering"],
  photo: photos.tacos,
  /** Sello sobre la foto: el personaje de la marca, sin alterar. */
  isotipo: isotipoRojo,
  since: "Est. 1988",
  texture: texturaCrimson,
  /** Íconos que flotan alrededor del logo. `depth` controla cuánto siguen al cursor. */
  orbit: [
    { src: iconoTaco, position: "left-[-12%] top-[16%]", size: "size-16 sm:size-20", depth: 28 },
    { src: iconoAguacate, position: "right-[-8%] top-[6%]", size: "size-14 sm:size-16", depth: -22 },
    { src: iconoHuevo, position: "right-[-12%] top-[48%]", size: "size-12 sm:size-16", depth: 18 },
    { src: iconoChile, position: "bottom-[-4%] right-[8%]", size: "size-14 sm:size-[4.5rem]", depth: -30 },
    { src: iconoLimon, position: "left-[-9%] top-[52%]", size: "size-10 sm:size-12", depth: -16 },
  ],
};

/** Personalidad de marca (docs/brand/01-concepto.md). */
export const personality = [
  { trait: "Cálida", meaning: "te recibe", icon: iconoSol },
  { trait: "Cercana", meaning: "te reconoce", icon: iconoTaza },
  { trait: "Honesta", meaning: "no exagera", icon: iconoMoler },
  { trait: "Constante", meaning: "siempre está", icon: iconoFuego },
  { trait: "Familiar", meaning: "se siente real", icon: iconoTaco },
];

export const ritual = {
  eyebrow: "El ritual del día",
  title: "Hecho en familia, de sol a sol",
  lead: "No es solo el inicio del día › es el ritmo completo.",
  sunIcon: iconoSol,
  moments: [
    {
      id: "amanecer",
      label: "Amanecer",
      kicker: "Desayuno",
      icon: iconoDesayuno,
      /** Posición del sol sobre el arco, en grados (0 = mediodía). */
      angle: -58,
      photo: photos.breakfast,
      lettering: { src: fraseBreakfastTaco, alt: "Home of the breakfast taco" },
      text: "Para quienes empiezan su día muy temprano: desayunos Tex-Mex rápidos, auténticos y hechos en casa, con el buen trato de siempre.",
    },
    {
      id: "mediodia",
      label: "Mediodía",
      kicker: "Almuerzo",
      icon: iconoPlato,
      angle: 0,
      photo: photos.lunchTable,
      lettering: { src: fraseHomeMade, alt: "Home made, good food" },
      text: "Una pausa en la jornada. Almuerzos accesibles con la rapidez que necesitas, sin perder nunca el sabor casero.",
    },
    {
      id: "en-familia",
      label: "En familia",
      kicker: "Catering",
      icon: iconoCaja,
      angle: 58,
      photo: photos.cateringTray,
      lettering: { src: fraseFromOurCocina, alt: "From our cocina to your familia" },
      text: "Reuniones, equipos de trabajo y eventos: con nuestro servicio de catering, el sabor de casa llega a tu mesa para compartir.",
    },
  ],
};

export const pillars: Record<string, { lettering: Lettering; text: string; icon: StaticImageData; photo: Photo }> = {
  Fe: {
    lettering: { src: fraseHechoConFe, alt: "Hecho con fe" },
    text: "Nacimos desde la fe. Es la que nos levanta cada amanecer y nos recuerda que siempre puede venir un mejor día.",
    icon: iconoSol,
    photo: photos.sunrise,
  },
  Servir: {
    lettering: { src: fraseMadeWithCarino, alt: "Made with cariño" },
    text: "Servir va más allá de entregar comida: es acompañar rutinas, con manos que trabajan con cariño y trato humano.",
    icon: iconoPlato,
    photo: photos.dough,
  },
  Familia: {
    lettering: { src: fraseTasteLikeFamilia, alt: "Sunrise taste like familia" },
    text: "Espacios para compartir y sentirse en casa, donde cada persona es recibida como parte de la familia.",
    icon: iconoSombrero,
    photo: photos.familyDinner,
  },
};

export const story = {
  eyebrow: "Nuestra historia",
  title: "Nuestra receta para los buenos días",
  photos: { main: photos.familyTable, detail: photos.tortillas },
  years: "+35",
  yearsLabel: "años de trayectoria",
  manifesto: [
    "Hay algo especial en los nuevos amaneceres: volver a empezar, seguir adelante y confiar en que siempre puede venir un mejor día.",
    "Sunrise Taquitos, con más de 35 años, nace desde la fe, la familia y el cariño por servir a los demás.",
    "Esa es nuestra receta para los buenos días: comida hecha en casa, manos que trabajan con cariño y momentos compartidos alrededor de la mesa.",
    "Porque aquí, cada persona importa: quien llega, quien trabaja y quien vuelve.",
    "Creemos que servir va más allá de entregar comida. Es acompañar rutinas, reunir familias y construir comunidad, un amanecer a la vez.",
  ],
  signature: { src: fraseTuCasaAlways, alt: "Tu casa always" } satisfies Lettering,
  why: "Porque la comida hecha en casa tiene el poder de unir a las familias y de convertir los pequeños rituales diarios en momentos memorables.",
};

export const principles = {
  eyebrow: "Cómo lo hacemos",
  title: "Seis principios, una misma mesa",
  items: [
    { title: "Hecho con intención", text: "Cada detalle se siente cercano, cálido y auténtico.", icon: iconoMoler },
    { title: "La familia primero", text: "Espacios pensados para compartir y sentirse en casa.", icon: iconoPlato },
    { title: "Homemade everyday", text: "La rapidez nunca pierde el sabor casero y humano.", icon: iconoFuego },
    { title: "Cercanía real", text: "Honestidad y buen trato, siempre.", icon: iconoTaza },
    { title: "Parte del día", text: "Más que comida: acompañamos rutinas.", icon: iconoSol },
    { title: "Siempre bienvenido", text: "Cada persona es recibida como parte de la familia.", icon: iconoSombrero },
  ],
};

export const closing = {
  title: { src: fraseHaveAGreatDia, alt: "Have a great día" } satisfies Lettering,
  text: "Desayuno, almuerzo o una reunión en familia: aquí siempre hay lugar para ti.",
  icons: [iconoTaco, iconoAguacate, iconoChile, iconoHuevo],
  photo: photos.sharedTable,
};
