import Image from "next/image";
import type { CSSProperties } from "react";
import type { ContactInfo } from "@/core/domain/restaurant/restaurant";
import { location } from "@/presentation/components/contact/contact-content";
import homeStyles from "@/presentation/components/home/home.module.css";
import motion from "@/presentation/components/motion/motion.module.css";
import { PointerField, Tilt } from "@/presentation/components/motion/pointer-fx";
import { RevealText } from "@/presentation/components/motion/reveal-text";
import { TodoNote } from "@/presentation/components/todo-note";

/**
 * Ubicación: la vista aérea del local con una tarjeta flotante.
 * El botón "Cómo llegar" abre Google Maps solo cuando el perfil trae la dirección.
 */
export function ContactLocation({ contact }: { contact: ContactInfo }) {
  const maps = contact.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`
    : null;

  return (
    <section aria-labelledby="ubicacion-title" className="bg-white px-4 pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-3 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-crimson">{location.eyebrow}</p>
            <h2 id="ubicacion-title" className="text-4xl sm:text-5xl lg:text-6xl">
              <RevealText text={location.title} />
            </h2>
          </div>
        </header>

        <PointerField className="relative">
          <div className={`${motion.grow} relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-charcoal sm:aspect-[16/9] sm:rounded-[2.5rem]`}>
            {/* La foto se aleja con el scroll y se desplaza un poco hacia el cursor. */}
            <div aria-hidden className={`${motion.zoomOut} absolute inset-0`}>
              <div className={`${homeStyles.parallax} absolute -inset-[4%]`} style={{ "--depth": -14 } as CSSProperties}>
              <Image
                src={location.photo.src}
                alt={location.photo.alt}
                fill
                sizes="(min-width: 1152px) 72rem, 100vw"
                quality={90}
                className="object-cover"
              />
              </div>
            </div>
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-charcoal/70 via-transparent to-transparent" />

            {/*
             * Pin que señala el local: la punta queda justo arriba del letrero (sin taparlo) y se
             * mueve con la foto. Con dirección en el perfil, abre Google Maps; sin ella, solo señala.
             */}
            <span
              className={`${homeStyles.parallax} absolute left-[49%] top-[30%] z-10`}
            style={{ "--depth": -14 } as CSSProperties}
          >
            <span className="flex -translate-x-1/2 -translate-y-full flex-col items-center">
              {maps ? (
                <a
                  href={maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${location.pin}: abrir Sunrise Taquitos en Google Maps`}
                  className={`${motion.float} group flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4 text-sm font-bold text-crimson shadow-xl shadow-charcoal/40 transition hover:scale-105 sm:text-base`}
                >
                  <PinLabel />
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              ) : (
                <span
                  aria-hidden
                  className={`${motion.float} flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4 text-sm font-bold text-crimson shadow-xl shadow-charcoal/40 sm:text-base`}
                >
                  <PinLabel />
                </span>
              )}
              <span aria-hidden className="h-6 w-0.5 bg-white shadow sm:h-8" />
              <span aria-hidden className="relative grid size-4 place-items-center">
                <span className={`${homeStyles.ping} -inset-2 border-white`} />
                <span className="size-4 rounded-full bg-crimson ring-4 ring-white shadow-lg" />
              </span>
            </span>
          </span>
          </div>

          {/* Tarjeta: sobre la foto en pantallas grandes; debajo en móvil. */}
          <div className={`${motion.stagger} relative z-10 -mt-16 mx-4 sm:mx-8 md:absolute md:bottom-8 md:left-8 md:mx-0 md:mt-0 md:w-[24rem]`}>
          <Tilt max={4} className="flex flex-col gap-5 rounded-[1.75rem] bg-white p-6 shadow-[0_2rem_4rem_-1.5rem] shadow-charcoal/50 ring-1 ring-charcoal/5 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl">
                <Image src={location.facade.src} alt={location.facade.alt} fill sizes="4rem" className="object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson">Sunrise Taquitos</p>
                <p className="mt-1 text-lg font-medium leading-snug">{contact.address ?? <TodoNote>dirección del cliente</TodoNote>}</p>
              </div>
            </div>
            <div className="border-t border-charcoal/10 pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/75">Horario</p>
              <p className="mt-1 text-lg">{contact.hours ?? <TodoNote>horario del cliente</TodoNote>}</p>
            </div>
            {maps ? (
              <a
                href={maps}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-crimson px-6 py-3 font-bold text-white shadow-lg shadow-crimson/30 transition hover:-translate-y-0.5"
              >
                {location.directions}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            ) : (
              <p className="text-sm">
                <TodoNote>botón &quot;{location.directions}&quot; (se activa con la dirección)</TodoNote>
              </p>
            )}
          </Tilt>
          </div>
        </PointerField>
      </div>
    </section>
  );
}

/** Contenido de la etiqueta del pin: ícono de la marca + "Aquí estamos". */
function PinLabel() {
  return (
    <>
      <span className="grid size-7 place-items-center rounded-full bg-crimson/[0.08]">
        <Image src={location.pinIcon} alt="" className="h-auto w-5" />
      </span>
      {location.pin}
    </>
  );
}
