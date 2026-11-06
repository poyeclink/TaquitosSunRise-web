"use client";

import Image from "next/image";
import { ritual } from "@/presentation/components/home/home-content";
import { useTabs } from "@/presentation/components/home/use-tabs";
import styles from "@/presentation/components/home/home.module.css";

/** Fondo del "cielo" según el momento del día. Solo tonos de la paleta de marca. */
const SKY = ["bg-crimson/[0.06]", "bg-aqua/[0.12]", "bg-charcoal/[0.06]"];

/**
 * El ritual del día: el usuario elige un momento y el sol recorre el arco.
 */
export function DayRitual() {
  const { active, tabProps, panelProps } = useTabs(ritual.moments.length);
  const moment = ritual.moments[active];

  return (
    <section id="ritual" aria-labelledby="ritual-title" className="bg-white px-4 py-20 sm:py-28">
      <header className={`${styles.reveal} mx-auto mb-12 max-w-2xl text-center sm:mb-16`}>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-crimson">{ritual.eyebrow}</p>
        <h2 id="ritual-title" className="text-balance text-4xl sm:text-5xl">
          {ritual.title}
        </h2>
        <p className="mt-4 text-lg text-charcoal/80 sm:text-xl">{ritual.lead}</p>
      </header>

      <div
        className={`${styles.reveal} mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] transition-colors duration-700 md:grid-cols-[1.05fr_1fr] ${SKY[active]}`}
      >
        {/* Foto del momento: las tres se superponen y se funden al cambiar de pestaña. */}
        <div className="relative aspect-[4/3] overflow-hidden bg-charcoal md:aspect-auto md:min-h-[38rem]">
          {ritual.moments.map((item, index) => (
            <Image
              key={item.id}
              src={item.photo.src}
              alt={index === active ? item.photo.alt : ""}
              aria-hidden={index !== active}
              fill
              sizes="(min-width: 1152px) 37rem, (min-width: 768px) 52vw, 100vw"
              className={`object-cover transition-[opacity,scale] duration-700 ease-out ${
                index === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            />
          ))}
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-charcoal/40 to-transparent to-50%" />
        </div>

        {/* Arco del sol + selector + texto */}
        <div className="flex flex-col items-center gap-8 px-6 py-10 sm:px-10 lg:px-12">
          <div aria-hidden className="pointer-events-none relative aspect-[2/1] w-full max-w-[15rem] sm:max-w-xs">
            <div className="absolute inset-x-0 top-0 aspect-square rounded-full border-2 border-dashed border-aqua [clip-path:inset(-1rem_-1rem_50%_-1rem)]" />
            <div
              className="absolute inset-x-0 top-0 aspect-square transition-transform duration-1000 ease-[cubic-bezier(0.34,1.3,0.64,1)]"
              style={{ transform: `rotate(${moment.angle}deg)` }}
            >
              <div className="absolute left-1/2 top-0 size-14 -translate-x-1/2 -translate-y-1/2 sm:size-16">
                <div
                  className="grid size-full place-items-center rounded-full bg-white shadow-[0_0_0_10px] shadow-white/60 transition-transform duration-1000"
                  style={{ transform: `rotate(${-moment.angle}deg)` }}
                >
                  <Image src={ritual.sunIcon} alt="" className="h-auto w-4/5" />
                </div>
              </div>
            </div>
            {/* Línea del horizonte */}
            <div className="absolute inset-x-[-8%] bottom-0 h-0.5 rounded-full bg-charcoal/30" />
          </div>

          <div role="tablist" aria-label="Momentos del día" className="grid w-full max-w-md grid-cols-3 gap-2 sm:gap-3">
            {ritual.moments.map((item, index) => (
              <button
                key={item.id}
                {...tabProps(index)}
                className={`flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-center transition sm:py-4 ${
                  index === active
                    ? "bg-crimson text-white shadow-lg shadow-crimson/30"
                    : "bg-white text-charcoal hover:-translate-y-0.5 hover:shadow-md"
                }`}
              >
                <span className={`grid size-10 place-items-center rounded-full ${index === active ? "bg-white" : ""}`}>
                  <Image src={item.icon} alt="" className="h-auto w-8" />
                </span>
                <span className="text-base font-bold leading-tight sm:text-lg">{item.label}</span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-80">{item.kicker}</span>
              </button>
            ))}
          </div>

          {/* Paneles */}
          <div className="w-full max-w-md">
            {ritual.moments.map((item, index) => (
              <div key={item.id} {...panelProps(index)} className={`${styles.panelEnter} rounded-3xl bg-white/80 p-6 sm:p-8`}>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-crimson">
                  {item.label} · {item.kicker}
                </p>
                <h3 className="mb-5">
                  <Image
                    src={item.lettering.src}
                    alt={item.lettering.alt}
                    loading="eager"
                    className="h-auto max-h-28 w-auto max-w-full sm:max-h-32"
                  />
                </h3>
                <p className="text-lg leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
