"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { pillars } from "@/presentation/components/home/home-content";
import styles from "@/presentation/components/home/home.module.css";

/**
 * Los pilares como paneles de foto: el activo se abre y muestra su lettering y su texto;
 * los demás quedan como franjas en gris. Se abren al pasar el cursor, con foco o al tocar.
 */
export function Pillars({ names }: { names: readonly string[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const items = names.flatMap((name) => (pillars[name] ? [{ name, ...pillars[name] }] : []));

  return (
    <section aria-labelledby="pilares-title" className="bg-charcoal px-4 py-20 text-white sm:py-28">
      <header className={`${styles.reveal} mx-auto mb-12 max-w-2xl text-center sm:mb-16`}>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em]">Nuestros pilares</p>
        <h2 id="pilares-title" className="text-4xl sm:text-5xl">
          {items.map(({ name }, index) => (
            <span key={name}>
              {index > 0 && (
                <span aria-hidden className="mx-3 text-aqua">
                  ›
                </span>
              )}
              <span className={`transition-opacity duration-500 ${index === active ? "" : "opacity-50"}`}>{name}</span>
            </span>
          ))}
        </h2>
      </header>

      <ol className={`${styles.reveal} mx-auto flex max-w-6xl flex-col gap-3 md:h-[36rem] md:flex-row md:gap-4`}>
        {items.map((pillar, index) => {
          const open = index === active;
          return (
            <li
              key={pillar.name}
              onPointerEnter={(event) => event.pointerType === "mouse" && setActive(index)}
              className={`relative isolate overflow-hidden rounded-[2rem] bg-charcoal ring-1 ring-white/15 transition-[flex-grow,height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:h-auto md:min-w-0 ${
                open ? "h-[33rem] md:flex-[3.4]" : "h-24 md:flex-1"
              }`}
            >
              <Image
                src={pillar.photo.src}
                alt={pillar.photo.alt}
                fill
                sizes="(min-width: 1152px) 46rem, (min-width: 768px) 62vw, 100vw"
                quality={90}
                className={`-z-20 object-cover transition-[scale,filter] duration-1000 ease-out motion-reduce:transition-none ${
                  open ? "" : "scale-110 grayscale"
                }`}
              />
              {/* Velo: degradado para leer el texto; más oscuro cuando el panel está cerrado. */}
              <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-charcoal via-charcoal/60 to-charcoal/10" />
              <div
                aria-hidden
                className={`absolute inset-0 -z-10 bg-charcoal/60 transition-opacity duration-700 ${open ? "opacity-0" : ""}`}
              />

              <h3 className="absolute inset-0">
                <button
                  type="button"
                  id={`${baseId}-tab-${index}`}
                  aria-expanded={open}
                  aria-controls={`${baseId}-panel-${index}`}
                  onClick={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className="absolute inset-0 w-full rounded-[2rem] text-left focus-visible:-outline-offset-4"
                >
                  <span className="absolute left-6 top-5 grid size-14 place-items-center rounded-full bg-white shadow-lg shadow-charcoal/40">
                    <Image src={pillar.icon} alt="" className="h-auto w-9" />
                  </span>
                  <span
                    aria-hidden
                    className={`absolute right-7 top-9 text-sm font-bold tabular-nums tracking-[0.25em] ${open ? "" : "md:max-lg:hidden"}`}
                  >
                    0{index + 1}
                  </span>
                  {/* Nombre del panel cerrado: horizontal en móvil, vertical en escritorio. */}
                  <span
                    className={`absolute left-24 top-1/2 -translate-y-1/2 text-3xl font-bold transition-opacity duration-300 md:bottom-8 md:left-1/2 md:top-auto md:-translate-x-1/2 md:translate-y-0 md:rotate-180 md:text-4xl md:[writing-mode:vertical-rl] ${
                      open ? "opacity-0" : "delay-300"
                    }`}
                  >
                    {pillar.name}
                  </span>
                </button>
              </h3>

              <div
                id={`${baseId}-panel-${index}`}
                role="region"
                aria-labelledby={`${baseId}-tab-${index}`}
                className={`pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-5 p-6 transition-[opacity,translate,visibility] duration-500 motion-reduce:transition-none sm:p-9 md:w-[min(34rem,46vw)] ${
                  open ? "delay-200" : "invisible translate-y-4 opacity-0"
                }`}
              >
                <p aria-hidden className="text-6xl font-bold leading-none sm:text-7xl">
                  {pillar.name}
                </p>
                <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
                  <span className="grid shrink-0 -rotate-3 place-items-center rounded-2xl bg-white px-4 py-3 shadow-xl shadow-charcoal/40">
                    <Image
                      src={pillar.lettering.src}
                      alt={pillar.lettering.alt}
                      className="h-20 w-40 object-contain"
                    />
                  </span>
                  <p className="text-lg leading-relaxed">{pillar.text}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
