/**
 * Copy y assets de "Nosotros". El texto sale de docs/brand/ (concepto, voz y manifiesto).
 * Los datos del negocio (hitos, fundadores, equipo, contacto) llegan por props desde el
 * perfil del restaurante: si faltan, la UI muestra un TODO visible.
 */
import type { StaticImageData } from "next/image";
import type { Lettering } from "@/presentation/components/home/home-content";
import { photos, type Photo } from "@/presentation/media/photos";

import fraseFromOurCocinaBlanco from "@brand/frases/frase-from-our-cocina-blanco.svg";
import fraseHechoConFe from "@brand/frases/frase-hecho-con-fe-rojo.svg";
import fraseTheHomemadeWay from "@brand/frases/frase-the-homemade-way-full-color.svg";
import fraseTuCasaAlways from "@brand/frases/frase-tu-casa-always-rojo.svg";

import iconoAguacate from "@brand/iconos/icono-aguacate.svg";
import iconoCaja from "@brand/iconos/icono-caja.svg";
import iconoChile from "@brand/iconos/icono-chile.svg";
import iconoCuchara from "@brand/iconos/icono-cuchara.svg";
import iconoDesayuno from "@brand/iconos/icono-desayuno.svg";
import iconoFuego from "@brand/iconos/icono-fuego.svg";
import iconoHuevo from "@brand/iconos/icono-huevo.svg";
import iconoMoler from "@brand/iconos/icono-moler.svg";
import iconoPlato from "@brand/iconos/icono-plato.svg";
import iconoSol from "@brand/iconos/icono-sol.svg";
import iconoSombrero from "@brand/iconos/icono-sombrero.svg";
import iconoTaco from "@brand/iconos/icono-taco.svg";
import iconoTaza from "@brand/iconos/icono-taza.svg";

import texturaCrimson from "@brand/texturas/textura-crimson.svg";

export const aboutHero = {
  eyebrow: "Nosotros · Est. 1988",
  /** La segunda línea se completa con el año de fundación del perfil. */
  title: "Hecho en familia,",
  titleAccent: (year: number) => `desde ${year}.`,
  lettering: { src: fraseFromOurCocinaBlanco, alt: "From our cocina to your familia" } satisfies Lettering,
  lead: "Más de 35 años sirviendo desayunos y almuerzos Tex-Mex con fe, en familia y con mucho cariño, un amanecer a la vez.",
  photo: photos.interior,
  years: "+35",
  yearsLabel: "años de trayectoria",
  sunIcon: iconoSol,
  /** Íconos que flotan alrededor del sello y siguen al cursor (`depth` = cuánto se mueven). */
  floaters: [
    { src: iconoTaco, position: "left-[2%] top-[12%]", size: "size-16", depth: 22 },
    { src: iconoAguacate, position: "right-[0%] top-[4%]", size: "size-14", depth: -18 },
    { src: iconoChile, position: "bottom-[6%] left-[8%]", size: "size-14", depth: -26 },
    { src: iconoHuevo, position: "bottom-[2%] right-[10%]", size: "size-[4.5rem]", depth: 16 },
  ],
};

/** Cinta de texto gigante que se desplaza con el scroll (decorativa). */
export const band = {
  /** La primera fila se completa con los pilares del perfil. */
  second: ["The homemade way", "Est. 1988", "Tu casa always"],
  icon: iconoSol,
};

/** Cifras de la franja bajo el hero. Las numéricas cuentan al entrar en pantalla. */
export const facts = {
  years: { value: 35, prefix: "+", label: "Años de trayectoria" },
  founded: { label: "Año de fundación" },
  pillars: { label: "Nuestros pilares" },
  services: { value: "Desayuno · Almuerzo · Catering", label: "Para todo el día" },
};

export const timeline = {
  eyebrow: "Nuestro camino",
  title: "Un amanecer a la vez",
  lead: "Más de 35 años de historia hecha en familia. Estos son algunos de los momentos que nos trajeron hasta aquí.",
  sunIcon: iconoSol,
  /** Cierre de la línea de tiempo: el presente, con el manifiesto de la marca. */
  today: {
    year: "Hoy",
    title: "Tu casa always",
    text: "Seguimos acompañando rutinas, reuniendo familias y construyendo comunidad, con la misma fe y el mismo cariño del primer día.",
    photo: photos.sunrise,
  },
  /**
   * Fotos para los hitos, en orden. Son fotos actuales del negocio que ocupan el lugar
   * mientras el cliente entrega las de cada momento (docs/brand/05-pendientes.md).
   */
  photos: [photos.barbacoaTaco, photos.cookStir, photos.dining, photos.rancheroPlate] as readonly Photo[],
};

export const purpose = {
  eyebrow: "Quiénes somos",
  title: "El ritual del día, hecho en familia",
  lead: "No es solo el inicio del día › es el ritmo completo.",
  /** What · Why · How (docs/brand/01-concepto.md). */
  items: [
    {
      label: "Qué hacemos",
      text: "Somos una marca Tex-Mex familiar, construida desde la cercanía, la constancia y la comida hecha con cariño.",
      icon: iconoTaco,
      photo: photos.fajitaTaco,
      tags: ["Tex-Mex", "Familiar", "Hecho con cariño"],
    },
    {
      label: "Por qué",
      text: "Porque la comida hecha en casa tiene el poder de unir a las familias y de convertir los pequeños rituales diarios en momentos memorables.",
      icon: iconoSol,
      photo: photos.familyKid,
      tags: ["Unir a las familias", "Rituales diarios"],
    },
    {
      label: "Cómo",
      text: "Con experiencias cercanas y consistentes que acompañan el ritmo del día: rapidez, comida casera y trato humano.",
      icon: iconoCuchara,
      photo: photos.masaHusk,
      tags: ["Rapidez", "Comida casera", "Trato humano"],
    },
  ],
  /** Íconos de misión y visión (en ese orden). */
  statementIcons: [iconoPlato, iconoSol],
};

export interface KitchenStep {
  readonly title: string;
  readonly text: string;
  readonly icon: StaticImageData;
  readonly photo: Photo;
}

export const kitchen = {
  eyebrow: "Detrás del comal",
  title: "Así se hace, the homemade way",
  lettering: { src: fraseTheHomemadeWay, alt: "The homemade way" } satisfies Lettering,
  steps: [
    {
      title: "Manos en la masa",
      text: "Así empiezan nuestras tortillas: con las manos, como se hace en casa.",
      icon: iconoMoler,
      photo: photos.dough,
    },
    {
      title: "Directo al comal",
      text: "Del comal a tu plato, calientitas y con su sabor de siempre.",
      icon: iconoFuego,
      photo: photos.tortillas,
    },
    {
      title: "Sazón casera",
      text: "Guisos hechos sin atajos, con la paciencia que pide la buena comida.",
      icon: iconoCuchara,
      photo: photos.filling,
    },
    {
      title: "Al momento",
      text: "Huevos al sartén para quienes empiezan su día muy temprano.",
      icon: iconoHuevo,
      photo: photos.eggs,
    },
    {
      title: "Servido con cariño",
      text: "Y al final, lo más importante: llevarlo a tu mesa con buen trato.",
      icon: iconoPlato,
      photo: photos.breakfastPlate,
    },
  ] satisfies readonly KitchenStep[],
};

export const community = {
  eyebrow: "Nuestra comunidad",
  title: "Aquí, cada persona importa",
  texture: texturaCrimson,
  people: [
    {
      title: "Quien llega",
      text: "Te recibimos como parte de la familia desde la primera visita.",
      icon: iconoSombrero,
      photo: photos.friends,
    },
    {
      title: "Quien trabaja",
      text: "Manos que trabajan con cariño, con honestidad y buen trato.",
      icon: iconoMoler,
      photo: photos.kneading,
    },
    {
      title: "Quien vuelve",
      text: "Para quienes nos hacen parte de su rutina: aquí siempre está tu lugar.",
      icon: iconoTaza,
      photo: photos.regulars,
    },
  ],
  early: {
    title: "Para quienes empiezan temprano",
    text: "Acompañamos a la gente que mueve el día desde muy temprano, y a las familias que se reúnen alrededor de la mesa.",
    icon: iconoDesayuno,
    /** Público principal (docs/brand/01-concepto.md). */
    groups: ["Trabajadores de la construcción", "Jardineros", "Niñeras", "Personal médico", "Familias"],
  },
};

export const founders = {
  eyebrow: "La familia Sunrise",
  title: "Donde todo empezó",
  lead: "Detrás de cada plato hay una familia que trabaja con fe, con cariño y con buen trato.",
  lettering: { src: fraseHechoConFe, alt: "Hecho con fe" } satisfies Lettering,
  heading: "Nuestros fundadores",
  /** Foto sin personas identificables: queda hasta que llegue la foto real de los fundadores. */
  photo: photos.tamales,
};

export const aboutClosing = {
  lettering: { src: fraseTuCasaAlways, alt: "Tu casa always" } satisfies Lettering,
  text: "Desayuno, almuerzo o catering para tu familia y tu equipo: aquí siempre hay lugar para ti.",
  photo: photos.aerial,
  icon: iconoCaja,
};
