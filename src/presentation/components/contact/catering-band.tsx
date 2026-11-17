"use client";

import Image from "next/image";
import { useId, useState, type CSSProperties } from "react";
import { catering } from "@/presentation/components/contact/contact-content";
import { PREFILL_EVENT, type PrefillDetail } from "@/presentation/components/contact/contact-form";
import styles from "@/presentation/components/contact/contact.module.css";
import homeStyles from "@/presentation/components/home/home.module.css";
import motion from "@/presentation/components/motion/motion.module.css";
import { Magnetic } from "@/presentation/components/motion/pointer-fx";
import { RevealText } from "@/presentation/components/motion/reveal-text";
import { smoothScrollTo } from "@/presentation/components/motion/smooth-scroll";
import { TodoNote } from "@/presentation/components/todo-note";

const { planner } = catering;

/**
 * Invitación al catering con un planificador: tipo de evento + personas arman un
 * borrador del mensaje, que pasa al formulario con el motivo "Catering" ya elegido.
 * No calcula precios ni promete mínimos: eso lo define el cliente.
 */
export function CateringBand() {
  const [eventIndex, setEventIndex] = useState(0);
  const [guests, setGuests] = useState(planner.guests.initial);
  const baseId = useId();

  const event = planner.events[eventIndex];
  const message = planner.message(event.phrase, guests, planner.guests.max);
  const fill = ((guests - planner.guests.min) / (planner.guests.max - planner.guests.min)) * 100;

  const prefill = () => {
    const detail: PrefillDetail = { topic: "catering", message };
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail }));
    const form = document.getElementById("formulario-title");
    if (!form) return;
    const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    smoothScrollTo(form.getBoundingClientRect().top + window.scrollY - offset);
  };

  return (
    <section aria-labelledby="catering-title" className="bg-white px-4 pb-20 sm:pb-28">
      <div
        className={`${motion.grow} mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-charcoal text-white shadow-[0_2rem_5rem_-2.5rem] shadow-charcoal/70 sm:rounded-[2.5rem] lg:grid-cols-[0.95fr_1.05fr]`}
      >
        <div className="flex flex-col items-start gap-5 p-7 sm:p-12">
          <span className={`${motion.stamp} grid size-16 place-items-center rounded-full bg-white shadow-lg`}>
            <Image src={catering.icon} alt="" className="h-auto w-10" />
          </span>
          <p className="text-sm font-bold uppercase tracking-[0.25em]">{catering.eyebrow}</p>
          <h2 id="catering-title" className="text-balance text-3xl sm:text-4xl lg:text-5xl">
            <RevealText text={catering.title} />
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-white/90 sm:text-xl">{catering.text}</p>
          <p className="text-sm">
            <TodoNote>{catering.todo}</TodoNote>
          </p>
        </div>

        {/* Foto de fondo con el planificador encima. */}
        <div className={`${homeStyles.zoomOnHover} relative isolate flex min-h-[34rem] items-end p-4 sm:p-8`}>
          <div aria-hidden className={`${motion.drift} absolute inset-x-0 -inset-y-[10%] -z-10`}>
            <Image
              src={catering.photo.src}
              alt={catering.photo.alt}
              fill
              sizes="(min-width: 1152px) 38rem, (min-width: 1024px) 52vw, 100vw"
              quality={90}
              className={`${homeStyles.zoom} object-cover`}
            />
          </div>

          <div className={`${motion.stagger} w-full rounded-[1.75rem] bg-white p-6 text-charcoal shadow-2xl shadow-charcoal/50 sm:p-7 lg:ml-auto lg:max-w-[25rem]`}>
            <h3 className="text-2xl font-bold">{planner.title}</h3>

            <fieldset className="mt-5">
              <legend className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-charcoal/75">{planner.eventLabel}</legend>
              <div className="flex flex-wrap gap-2">
                {planner.events.map((option, index) => {
                  const on = index === eventIndex;
                  return (
                    <label
                      key={option.label}
                      className={`cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-bold transition has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-aqua ${
                        on ? "border-crimson bg-crimson text-white" : "border-charcoal/15 hover:border-crimson hover:text-crimson"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`${baseId}-event`}
                        checked={on}
                        onChange={() => setEventIndex(index)}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-6">
              <div className="mb-3 flex items-baseline justify-between">
                <label htmlFor={`${baseId}-guests`} className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/75">
                  {planner.guestsLabel}
                </label>
                {/* `key` hace que el número rebote en cada cambio. */}
                <output htmlFor={`${baseId}-guests`} key={guests} className={`${styles.bump} text-3xl font-bold tabular-nums text-crimson`}>
                  {guests}
                  {guests >= planner.guests.max ? "+" : ""}
                </output>
              </div>
              <input
                id={`${baseId}-guests`}
                type="range"
                min={planner.guests.min}
                max={planner.guests.max}
                step={planner.guests.step}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className={`${styles.range} w-full`}
                style={{ "--fill": `${fill}%` } as CSSProperties}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-charcoal/[0.05] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/75">{planner.preview}</p>
              <p className="mt-2 leading-relaxed">“{message}”</p>
            </div>

            <Magnetic className="mt-6">
              <button
                type="button"
                onClick={prefill}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-crimson px-7 py-3.5 text-lg font-bold text-white shadow-lg shadow-crimson/30 transition hover:shadow-xl"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 transition-[left] duration-700 ease-out group-hover:left-[120%]"
                />
                {catering.cta}
                <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5">
                  ↑
                </span>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
