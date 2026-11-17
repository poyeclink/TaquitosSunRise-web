"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Milestone } from "@/core/domain/restaurant/restaurant";
import { timeline } from "@/presentation/components/about/about-content";
import { RevealText } from "@/presentation/components/about/reveal-text";
import { smoothScrollTo } from "@/presentation/components/about/smooth-scroll";
import homeStyles from "@/presentation/components/home/home.module.css";
import { useTabs } from "@/presentation/components/home/use-tabs";
import { TodoNote } from "@/presentation/components/todo-note";
import type { Photo } from "@/presentation/media/photos";

interface Moment extends Milestone {
  readonly photo: Photo;
}

const pad = (value: number) => String(value).padStart(2, "0");
const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** Pantallas donde la línea de tiempo se fija y avanza con el scroll. */
const PIN_QUERY = "(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";
/** Cuánto scroll (en vh) toma cada momento cuando está fijada. */
const VH_PER_MOMENT = 55;

/** Recorrido del modo fijado: de cuando el bloque toca su `top` a cuando se suelta. */
function measure(wrap: HTMLElement | null, sticky: HTMLElement | null) {
  if (!wrap || !sticky) return null;
  const top = parseFloat(getComputedStyle(sticky).top) || 0;
  const rect = wrap.getBoundingClientRect();
  return { top, rect, total: Math.max(1, rect.height - sticky.offsetHeight) };
}

/**
 * Línea de tiempo: el sol avanza sobre el riel hasta el momento elegido.
 * En pantallas grandes se fija y el scroll la recorre; en las demás funciona con
 * clic, flechas o teclado (patrón WAI-ARIA Tabs). Los hitos sin datos muestran un TODO.
 */
export function AboutTimeline({ milestones }: { milestones: readonly Milestone[] }) {
  const moments: Moment[] = [
    ...milestones.map((m, i) => ({ ...m, photo: timeline.photos[i % timeline.photos.length] })),
    timeline.today,
  ];
  const count = moments.length;
  const { active, setActive, tabProps, panelProps } = useTabs(count);

  const wrap = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  /** Riel: en modo fijado recibe el avance continuo del scroll en `--p` (sin re-render por cuadro). */
  const rail = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const activeRef = useRef(active);
  const fromScroll = useRef(false);

  useEffect(() => {
    const query = window.matchMedia(PIN_QUERY);
    const update = () => setPinned(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // El scroll elige el momento activo.
  useEffect(() => {
    if (!pinned) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = measure(wrap.current, sticky.current);
        if (!r) return;
        const progress = clamp((r.top - r.rect.top) / r.total);
        rail.current?.style.setProperty("--p", progress.toFixed(4));
        const index = Math.round(progress * (count - 1));
        if (index !== activeRef.current) {
          fromScroll.current = true;
          setActive(index);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned, count, setActive]);

  // Si el cambio vino de un clic o del teclado, el scroll va hasta ese momento.
  useEffect(() => {
    if (activeRef.current === active) return; // p. ej. al activarse el modo fijado: no saltar.
    activeRef.current = active;
    if (fromScroll.current) {
      fromScroll.current = false;
      return;
    }
    if (!pinned) return;
    const r = measure(wrap.current, sticky.current);
    if (!r) return;
    const target = window.scrollY + r.rect.top - r.top + (active / (count - 1)) * r.total;
    smoothScrollTo(target);
  }, [active, pinned, count]);

  // El riel va del centro de la primera columna al centro de la última.
  const half = `calc(100% / ${count * 2})`;
  const span = `(100% - 100% / ${count})`;
  // Sin modo fijado, el riel salta de momento en momento con transición.
  const railStyle = pinned ? undefined : ({ "--p": count > 1 ? active / (count - 1) : 0 } as CSSProperties);
  const ease = pinned
    ? ""
    : "transition-[left,width,rotate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

  return (
    <section id="camino" aria-labelledby="camino-title" className="bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 grid gap-4 md:mb-16 md:grid-cols-[1fr_1fr] md:items-end md:gap-12">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-crimson">{timeline.eyebrow}</p>
            <h2 id="camino-title" className="text-balance text-4xl sm:text-5xl lg:text-6xl">
              <RevealText text={timeline.title} />
            </h2>
          </div>
          <p className={`${homeStyles.reveal} max-w-md text-lg leading-relaxed sm:text-xl md:justify-self-end`}>{timeline.lead}</p>
        </header>

        <div ref={wrap} style={pinned ? { height: `calc(${count * VH_PER_MOMENT}vh + 100svh - 9rem)` } : undefined}>
          <div ref={sticky} className={pinned ? "sticky top-28" : ""}>
            {/* Riel con el sol */}
            <div ref={rail} className="relative mb-10 sm:mb-12" style={railStyle}>
              <div aria-hidden className="absolute top-7 h-1 rounded-full bg-charcoal/10" style={{ left: half, right: half }} />
              <div
                aria-hidden
                className={`absolute top-7 h-1 rounded-full bg-crimson ${ease}`}
                style={{ left: half, width: `calc(${span} * var(--p, 0))` }}
              />
              <span
                aria-hidden
                className={`absolute top-7 z-10 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lg shadow-charcoal/25 ring-1 ring-charcoal/10 ${ease}`}
                style={{ left: `calc(${half} + ${span} * var(--p, 0))` }}
              >
                <Image
                  src={timeline.sunIcon}
                  alt=""
                  className={`h-auto w-9 ${ease}`}
                  style={{ rotate: "calc(var(--p, 0) * 360deg)" }}
                />
              </span>

              <div
                role="tablist"
                aria-label="Momentos de nuestra historia"
                className="relative grid"
                style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
              >
                {moments.map((moment, index) => {
                  const on = index === active;
                  const passed = index <= active;
                  return (
                    <button
                      key={index}
                      {...tabProps(index)}
                      aria-label={moment.year ?? `Momento ${index + 1}, año pendiente`}
                      className="group flex flex-col items-center gap-4 rounded-2xl pb-1 pt-[1.375rem]"
                    >
                      <span
                        aria-hidden
                        className={`size-3.5 rounded-full ring-4 ring-white transition-[background-color,scale] duration-500 group-hover:scale-150 ${
                          passed ? "bg-crimson" : "bg-charcoal/25 group-hover:bg-charcoal/50"
                        } ${on ? "opacity-0" : ""}`}
                      />
                      <span
                        aria-hidden
                        className={`text-base font-bold tabular-nums transition-[color,scale] duration-300 sm:text-xl ${
                          on ? "scale-110 text-crimson" : "text-charcoal/70 group-hover:text-charcoal"
                        }`}
                      >
                        {moment.year ?? (
                          <span className="rounded border border-dashed border-current px-1.5 text-xs sm:text-sm">Año</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Paneles: todos en la misma celda para que la altura no salte al cambiar. */}
            <div className="grid grid-cols-1">
              {moments.map((moment, index) => {
                const on = index === active;
                const before = index < active;
                return (
                  <article
                    key={index}
                    {...panelProps(index)}
                    hidden={undefined}
                    inert={!on}
                    className={`col-start-1 row-start-1 grid min-w-0 grid-cols-1 gap-8 transition-[visibility] duration-700 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-14 ${
                      on ? "" : "invisible"
                    }`}
                  >
                    {/* La foto se descubre como una cortina; el texto entra desde el lado del scroll. */}
                    <div
                      className={`transition-[clip-path,scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        on
                          ? "[clip-path:inset(0_0_0_0_round_2rem)]"
                          : `scale-95 ${before ? "[clip-path:inset(0_100%_0_0_round_2rem)]" : "[clip-path:inset(0_0_0_100%_round_2rem)]"}`
                      }`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-charcoal lg:aspect-auto lg:h-[min(26rem,calc(100svh_-_17rem))]">
                        <Image
                          src={moment.photo.src}
                          alt={moment.photo.alt}
                          fill
                          sizes="(min-width: 1152px) 36rem, (min-width: 768px) 50vw, 100vw"
                          quality={90}
                          className={`object-cover transition-[scale] duration-[1.4s] ease-out ${on ? "" : "scale-125"}`}
                        />
                      </div>
                    </div>

                    <div
                      className={`flex flex-col items-start gap-4 transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none ${
                        on ? "delay-150" : `opacity-0 ${before ? "-translate-y-6" : "translate-y-6"}`
                      }`}
                    >
                      <p className="text-sm font-bold uppercase tracking-[0.25em] text-charcoal/80">
                        Capítulo {pad(index + 1)} / {pad(count)}
                      </p>
                      <p className="text-7xl font-bold leading-none text-crimson sm:text-8xl">
                        {moment.year ?? <TodoNote>año</TodoNote>}
                      </p>
                      <h3 className="text-3xl font-bold sm:text-4xl">
                        {moment.title ?? <TodoNote>título del hito</TodoNote>}
                      </h3>
                      <p className="max-w-md text-lg leading-relaxed sm:text-xl">
                        {moment.text ?? <TodoNote>qué pasó en este momento (texto del cliente)</TodoNote>}
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setActive(Math.max(0, active - 1))}
                          disabled={active === 0}
                          aria-label="Momento anterior"
                          className="grid size-12 place-items-center rounded-full border-2 border-charcoal/20 text-xl font-bold transition hover:border-crimson hover:text-crimson disabled:pointer-events-none disabled:opacity-35"
                        >
                          <span aria-hidden>←</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActive(Math.min(count - 1, active + 1))}
                          disabled={active === count - 1}
                          aria-label="Momento siguiente"
                          className="grid size-12 place-items-center rounded-full bg-crimson text-xl font-bold text-white shadow-lg shadow-crimson/30 transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-35"
                        >
                          <span aria-hidden>→</span>
                        </button>
                        {pinned && (
                          <span className="ml-2 text-sm font-bold uppercase tracking-[0.2em] text-charcoal/70">
                            o sigue bajando <span aria-hidden className={`${homeStyles.nudge}`}>↓</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
