import Image from "next/image";
import type { CSSProperties } from "react";
import type { ContactInfo } from "@/core/domain/restaurant/restaurant";
import { contactHero, quickCards } from "@/presentation/components/contact/contact-content";
import styles from "@/presentation/components/contact/contact.module.css";
import { RotatingWords } from "@/presentation/components/contact/rotating-words";
import homeStyles from "@/presentation/components/home/home.module.css";
import motion from "@/presentation/components/motion/motion.module.css";
import { Magnetic, PointerField, Tilt } from "@/presentation/components/motion/pointer-fx";
import { TodoNote } from "@/presentation/components/todo-note";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** Enlace útil para cada dato: llamar, o abrir la dirección en mapas. */
function hrefFor(key: (typeof quickCards)[number]["key"], value: string | null) {
  if (!value) return undefined;
  if (key === "phone") return `tel:${value.replace(/[^\d+]/g, "")}`;
  if (key === "address") return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
  return undefined;
}

export function ContactHero({ contact }: { contact: ContactInfo }) {
  return (
    <>
    <section aria-labelledby="contacto-title" className="relative isolate overflow-hidden bg-crimson text-white">
      <Image src={contactHero.texture} alt="" fill sizes="100vw" className="-z-10 object-cover" />

      <PointerField className="relative">
        <div aria-hidden className={styles.spotlight} />
        <div
          className={`${motion.heroExit} mx-auto grid max-w-6xl items-center gap-12 px-4 pb-44 pt-14 sm:pt-20 md:grid-cols-[1.3fr_0.7fr] md:gap-8 md:pb-52`}
        >
          <div className="flex flex-col items-start gap-6">
            <p
              className={`${motion.rise} rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] sm:text-sm`}
              style={order(0)}
            >
              {contactHero.eyebrow}
            </p>
            <h1 id="contacto-title" className="text-balance text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              {contactHero.title.map((line, index) => (
                <span key={line} className={`${motion.rise} block`} style={order(index + 1)}>
                  {line}
                  {index === contactHero.title.length - 1 && (
                    <span aria-hidden className="ml-3 inline-block h-2 w-14 rounded-full bg-white/80 align-middle sm:w-20" />
                  )}
                </span>
              ))}
            </h1>
            <p className={`${motion.rise} text-2xl sm:text-3xl`} style={order(3)}>
              {contactHero.askPrefix} <RotatingWords words={contactHero.askWords} />
            </p>
            <p className={`${motion.rise} max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl`} style={order(4)}>
              {contactHero.lead}
            </p>
            <Magnetic>
              <a
                href="#formulario"
                className={`${motion.rise} group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-lg font-bold text-crimson shadow-lg shadow-charcoal/30 transition hover:shadow-xl focus-visible:outline-white`}
                style={order(5)}
              >
                Escríbenos
                <span aria-hidden className={homeStyles.nudge}>
                  ↓
                </span>
              </a>
            </Magnetic>
          </div>

          {/* Sello giratorio con el personaje de la marca e íconos que siguen al cursor. */}
          <div aria-hidden className={`${motion.rise} hidden justify-center md:flex`} style={order(3)}>
            <div className="relative grid aspect-square w-full max-w-[20rem] place-items-center">
              <div className={homeStyles.rays} />
              <svg viewBox="0 0 200 200" className={`${motion.spin} absolute inset-[8%] fill-white`}>
                <defs>
                  <path id="contact-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text className="text-[13px] font-bold uppercase tracking-[0.32em]">
                  <textPath href="#contact-ring">{contactHero.ring.repeat(2)}</textPath>
                </text>
              </svg>
              <div
                className={`${homeStyles.parallax} grid size-[48%] place-items-center rounded-full bg-crimson shadow-2xl shadow-charcoal/50 ring-8 ring-white/20`}
                style={{ "--depth": 8 } as CSSProperties}
              >
                {/* w-24 = 96 px: por encima del mínimo de 75.6 px del logo. */}
                <Image src={contactHero.isotipo} alt="" className="h-auto w-24" />
              </div>
              {contactHero.floaters.map((floater, index) => (
                <span
                  key={floater.src.src}
                  className={`${homeStyles.parallax} absolute ${floater.position}`}
                  style={{ "--depth": floater.depth } as CSSProperties}
                >
                  <span
                    className={`${motion.float} grid ${floater.size} place-items-center rounded-full bg-white shadow-xl shadow-charcoal/40`}
                    style={{ "--delay": `${index * -1.7}s` } as CSSProperties}
                  >
                    <Image src={floater.src} alt="" className="h-auto w-3/5" />
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </PointerField>

      {/* Horizonte del home. */}
      <svg aria-hidden viewBox="0 0 1440 90" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-px h-10 w-full fill-white sm:h-16">
        <path d="M0 90C360 10 1080 10 1440 90Z" />
      </svg>
    </section>

      {/* Tarjetas rápidas: fuera de la sección (que recorta) para montarse sobre su borde. */}
      <ul aria-label="Datos de contacto" className="relative z-10 mx-auto -mt-32 grid max-w-6xl gap-4 px-4 sm:-mt-28 sm:grid-cols-3 sm:gap-5">
        {quickCards.map((card, index) => {
          const value = contact[card.key];
          const href = hrefFor(card.key, value);
          const Body = (
            <>
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-crimson/[0.08] transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                <Image src={card.icon} alt="" className="h-auto w-9" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold uppercase tracking-[0.2em] text-crimson">{card.label}</span>
                <span className="mt-1 block text-lg font-medium leading-snug">{value ?? <TodoNote>{card.todo}</TodoNote>}</span>
              </span>
            </>
          );
          return (
            <li key={card.key} className={motion.rise} style={order(5 + index)}>
              <Tilt
                max={5}
                className="group h-full rounded-[1.75rem] bg-white text-charcoal shadow-[0_1.5rem_3rem_-1.5rem] shadow-charcoal/50 ring-1 ring-charcoal/5"
              >
                {href ? (
                  <a href={href} className="flex h-full items-center gap-4 rounded-[inherit] p-5 sm:p-6">
                    {Body}
                  </a>
                ) : (
                  <div className="flex h-full items-center gap-4 p-5 sm:p-6">{Body}</div>
                )}
              </Tilt>
            </li>
          );
        })}
      </ul>
    </>
  );
}
