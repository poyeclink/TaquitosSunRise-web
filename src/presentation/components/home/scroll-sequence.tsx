"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { sequence, type SequenceChapter } from "@/presentation/components/home/home-content";
import styles from "@/presentation/components/home/home.module.css";

const { frames } = sequence;
const chapters: readonly SequenceChapter[] = sequence.chapters;

/** Los frames terminan al 92 % del scroll: el último capítulo descansa sobre la imagen final. */
const HOLD = 0.92;

/** Misma consulta que la variante `wide:` de `globals.css`. */
const WIDE = "(min-width: 768px) and (min-aspect-ratio: 5/4) and (min-height: 560px) and (prefers-reduced-motion: no-preference)";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const pad = (value: number, length: number) => String(value).padStart(length, "0");
const frameUrl = (dir: string, index: number) => `${frames.base}/${dir}/${pad(index + 1, 3)}.webp`;

/** Primero 1 de cada 8 frames (y el último), luego el resto: se puede hacer scroll antes de que cargue todo. */
const rank = (index: number) =>
  index % 8 === 0 || index === frames.count - 1 ? 0 : index % 4 === 0 ? 1 : index % 2 === 0 ? 2 : 3;
const LOAD_ORDER = Array.from({ length: frames.count }, (_, index) => index).sort(
  (a, b) => rank(a) - rank(b) || a - b,
);

/** Cada palabra del título entra desde abajo y sale hacia arriba, detrás de una máscara. */
const WORD = { on: "", up: "-translate-y-[115%]", down: "translate-y-[115%]" };

/**
 * La imagen tiene fondo blanco puro, igual que la sección: sus bordes no se ven.
 * Apilada: contenida en su caja. Apaisada: ocupa todo el alto y se corre a la derecha
 * para dejar la columna de texto libre.
 */
const MEDIA = `${styles.sequenceMedia} absolute inset-0 size-full object-contain wide:right-auto wide:left-1/2 wide:w-auto wide:max-w-none wide:-translate-x-[34%]`;

/**
 * Secuencia 3D que avanza y retrocede con el scroll, con capítulos de texto.
 * La sección es alta y el escenario queda fijo (sticky) mientras se recorre.
 * Con `prefers-reduced-motion` no hay scroll largo: imagen final fija y capítulos apilados.
 */
export function ScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !canvas || !ctx) return;

    const set = window.matchMedia(WIDE).matches ? frames.sets.lg : frames.sets.sm;
    canvas.width = set.width;
    canvas.height = set.height;

    const loaded: (HTMLImageElement | undefined)[] = [];
    let cancelled = false;
    let target = 0;
    let drawn = -1;

    /** Dibuja el frame cargado más cercano al pedido. */
    const draw = () => {
      for (let distance = 0; distance < frames.count; distance++) {
        const index = loaded[target - distance] ? target - distance : loaded[target + distance] ? target + distance : -1;
        if (index < 0) continue;
        if (index !== drawn) {
          ctx.drawImage(loaded[index]!, 0, 0, canvas.width, canvas.height);
          drawn = index;
        }
        return;
      }
    };

    const load = (index: number) => {
      const img = document.createElement("img");
      img.fetchPriority = "low";
      img.src = frameUrl(set.dir, index);
      img
        .decode()
        .then(() => {
          if (cancelled) return;
          loaded[index] = img;
          draw();
        })
        .catch(() => {}); // Si un frame falla, se usa el vecino más cercano.
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target = frames.count - 1;
      load(target);
      return () => {
        cancelled = true;
      };
    }

    let raf = 0;
    let started = false;
    let eased = 0;
    let last = 0;
    let chapter = 0;

    const tick = (now: number) => {
      const box = section.getBoundingClientRect();
      const progress = clamp(-box.top / (box.height - window.innerHeight));
      // Suavizado por tiempo (no por frame): se siente igual a 60 Hz que a 120 Hz.
      eased += (progress - eased) * (1 - Math.exp(-(now - last) / 110));
      last = now;
      if (Math.abs(progress - eased) < 0.0005) eased = progress;

      target = Math.round(clamp(eased / HOLD) * (frames.count - 1));
      draw();
      section.style.setProperty("--progress", eased.toFixed(4));

      const next = Math.min(chapters.length - 1, Math.floor(eased * chapters.length));
      if (next !== chapter) {
        chapter = next;
        setActive(next);
      }
      raf = requestAnimationFrame(tick);
    };

    // Los frames se piden al acercarse a la sección; el bucle solo corre mientras está cerca.
    const observer = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf);
        if (!entry.isIntersecting) return;
        if (!started) {
          started = true;
          LOAD_ORDER.forEach(load);
        }
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "50% 0px" },
    );
    observer.observe(section);

    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  /** Lleva el scroll al capítulo elegido en la barra. */
  const jump = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const span = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((index + 0.4) / chapters.length), behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="secuencia-title"
      className="relative h-[500svh] bg-white motion-reduce:h-auto"
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-5 overflow-hidden pb-6 pt-24 motion-reduce:static motion-reduce:h-auto motion-reduce:py-20 wide:block wide:p-0">
        {/* Imagen: ocupa el alto que deja el texto (apilada) o todo el escenario bajo el header (apaisada). */}
        <div className="relative mx-auto min-h-0 w-full max-w-xl flex-1 motion-reduce:aspect-[10/9] motion-reduce:flex-none wide:absolute wide:inset-x-0 wide:bottom-0 wide:top-24 wide:max-w-none">
          <Image
            src={frameUrl(frames.sets.lg.dir, 0)}
            alt={sequence.alt}
            width={frames.sets.lg.width}
            height={frames.sets.lg.height}
            unoptimized
            className={MEDIA}
          />
          <canvas ref={canvasRef} aria-hidden className={MEDIA} />
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 wide:h-full wide:justify-center wide:gap-8 wide:pt-24">
          <div className="relative isolate flex flex-col gap-4 wide:max-w-sm wide:gap-6 xl:wide:max-w-md">
            {/* Número de capítulo de fondo: rueda como un contador. */}
            <div
              aria-hidden
              className="absolute -top-6 right-0 -z-10 hidden h-[9rem] overflow-hidden text-[9rem] font-bold leading-none tabular-nums text-crimson/10 xl:wide:block"
            >
              <div
                className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateY(-${(active * 100) / chapters.length}%)` }}
              >
                {chapters.map((chapter, index) => (
                  <span key={chapter.title} className="block h-[9rem]">
                    {pad(index + 1, 2)}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Insignia: el ícono cambia con el capítulo y el aro gira con el scroll. */}
              <span
                aria-hidden
                className="relative grid size-12 shrink-0 place-items-center rounded-full bg-white shadow-lg shadow-charcoal/15 ring-1 ring-charcoal/10 wide:size-14"
              >
                <span
                  className="absolute -inset-1.5 rounded-full border-2 border-dashed border-aqua motion-reduce:hidden"
                  style={{ rotate: "calc(var(--progress, 0) * 720deg)" }}
                />
                {chapters.map((chapter, index) => (
                  <Image
                    key={chapter.title}
                    src={chapter.icon}
                    alt=""
                    className={`col-start-1 row-start-1 h-auto w-3/5 transition-[opacity,scale,rotate] duration-500 ease-out motion-reduce:transition-none ${
                      index === active ? "" : "-rotate-90 scale-50 opacity-0"
                    }`}
                  />
                ))}
              </span>
              <h2 id="secuencia-title" className="text-sm font-bold uppercase tracking-[0.25em] text-crimson">
                {sequence.eyebrow}
              </h2>
            </div>

            {/* Los capítulos comparten celda y se relevan; sin animación, se apilan. */}
            <ol className="grid motion-reduce:gap-8">
              {chapters.map((chapter, index) => {
                const state = index === active ? "on" : index < active ? "up" : "down";
                return (
                  <li
                    key={chapter.title}
                    className={`col-start-1 row-start-1 motion-reduce:pointer-events-auto motion-reduce:col-auto motion-reduce:row-auto ${
                      state === "on" ? "" : "pointer-events-none"
                    }`}
                  >
                    <h3 className="text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl wide:text-6xl xl:wide:text-7xl">
                      {chapter.title.split(" ").map((word, position) => (
                        <Fragment key={position}>
                          <span className="-my-[0.14em] inline-block overflow-hidden py-[0.14em] align-bottom">
                            <span
                              className={`inline-block transition-[translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-none motion-reduce:transition-none ${WORD[state]} ${
                                word === chapter.accent ? "text-crimson" : ""
                              }`}
                              style={{ transitionDelay: state === "on" ? `${120 + position * 80}ms` : "0ms" }}
                            >
                              {word}
                            </span>
                          </span>{" "}
                        </Fragment>
                      ))}
                    </h3>
                    <div
                      className={`mt-3 transition-[opacity,translate] duration-500 ease-out motion-reduce:translate-none motion-reduce:opacity-100 motion-reduce:transition-none wide:mt-5 ${
                        state === "on" ? "delay-300" : `opacity-0 ${state === "up" ? "-translate-y-3" : "translate-y-3"}`
                      }`}
                    >
                      <p className="max-w-xs text-base leading-relaxed text-charcoal/90 sm:text-lg xl:wide:max-w-sm xl:wide:text-xl">
                        {chapter.text}
                      </p>
                      {chapter.lettering && (
                        <Image
                          src={chapter.lettering.src}
                          alt={chapter.lettering.alt}
                          className="mt-3 h-14 w-28 object-contain object-left wide:mt-4 wide:h-24 wide:w-44"
                        />
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="flex items-end justify-between gap-5 wide:max-w-sm wide:flex-col wide:items-stretch wide:gap-7 xl:wide:max-w-md">
            {/* Barra de capítulos: cada tramo se llena con el scroll y lleva a su capítulo. */}
            <nav aria-label="Capítulos" className="flex-1 motion-reduce:hidden">
              <ol className="flex gap-2">
                {chapters.map((chapter, index) => (
                  <li key={chapter.title} className="flex-1">
                    <button
                      type="button"
                      onClick={() => jump(index)}
                      aria-current={index === active ? "step" : undefined}
                      aria-label={`Ir al capítulo ${index + 1}: ${chapter.title}`}
                      className="group block w-full pt-3 text-left"
                    >
                      <span aria-hidden className="block h-0.5 overflow-hidden rounded-full bg-charcoal/15">
                        <span
                          className="block size-full origin-left bg-crimson"
                          style={{ scale: `clamp(0, calc(var(--progress, 0) * ${chapters.length} - ${index}), 1) 1` }}
                        />
                      </span>
                      <span
                        aria-hidden
                        className={`mt-2 flex items-baseline gap-1.5 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                          index === active ? "text-crimson" : "text-charcoal/75 group-hover:text-charcoal"
                        }`}
                      >
                        <span className="tabular-nums">{pad(index + 1, 2)}</span>
                        <span className="hidden sm:inline">{chapter.nav}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="flex items-center gap-6">
              <Link
                href="/menu"
                className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-crimson px-5 py-2.5 text-base font-bold text-white shadow-lg shadow-crimson/30 transition hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-lg"
              >
                Ver el menú
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              {/* Pista de scroll: solo al inicio. */}
              <span
                aria-hidden
                className={`hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-charcoal/75 transition-opacity duration-500 wide:flex ${
                  active === 0 ? "" : "opacity-0"
                }`}
              >
                {sequence.hint}
                <span className={`${styles.nudge} text-base leading-none`}>↓</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
