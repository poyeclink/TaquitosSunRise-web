"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { kitchen } from "@/presentation/components/about/about-content";
import styles from "@/presentation/components/about/about.module.css";
import { RevealText } from "@/presentation/components/about/reveal-text";
import homeStyles from "@/presentation/components/home/home.module.css";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * "Detrás del comal".
 * - Pantallas grandes: la sección se fija y el scroll vertical recorre el carril en horizontal
 *   (CSS scroll-driven; el componente solo mide `--shift`, lo que sobra del carril).
 * - Resto: carrusel con scroll nativo (táctil, rueda, teclado), arrastre con mouse y botones.
 */
export function KitchenGallery() {
  const track = useRef<HTMLOListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [shift, setShift] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [state, setState] = useState({ progress: 0, atStart: true, atEnd: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const last = el.lastElementChild as HTMLElement | null;
    const padRight = parseFloat(getComputedStyle(el).paddingRight) || 0;
    if (last) setShift(Math.max(0, last.offsetLeft + last.offsetWidth + padRight - el.clientWidth));
    const max = el.scrollWidth - el.clientWidth;
    setState({
      progress: max > 0 ? el.scrollLeft / max : 1,
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= max - 4,
    });
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (track.current) observer.observe(track.current);
    return () => observer.disconnect();
  }, [measure]);

  const go = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * (card.clientWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  // Arrastre con mouse (en táctil ya lo hace el navegador).
  const onPointerDown = (event: PointerEvent<HTMLOListElement>) => {
    const el = track.current;
    if (event.pointerType !== "mouse" || !el || el.scrollWidth <= el.clientWidth) return;
    drag.current = { x: event.clientX, left: el.scrollLeft, moved: false };
  };

  const onPointerMove = (event: PointerEvent<HTMLOListElement>) => {
    const el = track.current;
    const start = drag.current;
    if (!el || !start) return;
    const dx = event.clientX - start.x;
    if (!start.moved && Math.abs(dx) > 4) {
      start.moved = true;
      setDragging(true);
      el.setPointerCapture(event.pointerId);
    }
    if (start.moved) el.scrollLeft = start.left - dx;
  };

  const endDrag = () => {
    drag.current = null;
    setDragging(false);
  };

  const arrow =
    "grid size-12 place-items-center rounded-full text-xl font-bold transition disabled:pointer-events-none disabled:opacity-35";

  return (
    <section
      aria-labelledby="cocina-title"
      className={`${styles.kitchen} bg-white`}
      style={{ "--shift": `${shift}px` } as CSSProperties}
    >
      <div className={`${styles.kitchenSticky} py-20 sm:py-28`}>
        <div className="mx-auto mb-10 flex w-full max-w-6xl flex-col gap-6 px-4 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <header>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-crimson">{kitchen.eyebrow}</p>
            <h2 id="cocina-title" className="max-w-xl text-balance text-4xl sm:text-5xl lg:text-6xl">
              <RevealText text={kitchen.title} />
            </h2>
          </header>
          <div className={`${styles.kitchenNav} flex items-center gap-3`}>
            <button type="button" onClick={() => go(-1)} disabled={state.atStart} aria-label="Paso anterior" className={`${arrow} border-2 border-charcoal/20 hover:border-crimson hover:text-crimson`}>
              <span aria-hidden>←</span>
            </button>
            <button type="button" onClick={() => go(1)} disabled={state.atEnd} aria-label="Paso siguiente" className={`${arrow} bg-crimson text-white shadow-lg shadow-crimson/30 hover:-translate-y-0.5`}>
              <span aria-hidden>→</span>
            </button>
          </div>
          <p className={`${styles.kitchenHint} items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-charcoal/70`}>
            Sigue bajando <span aria-hidden className={homeStyles.nudge}>↓</span>
          </p>
        </div>

        {/* El padding alinea la primera tarjeta con el contenedor de 72rem. */}
        <ol
          ref={track}
          onScroll={measure}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={endDrag}
          tabIndex={0}
          aria-label="Pasos de nuestra cocina"
          className={`${styles.kitchenTrack} ${dragging ? styles.dragging : "cursor-grab"} relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[max(1rem,calc((100%_-_72rem)/2_+_1rem))] pb-4 [scrollbar-width:none] scroll-px-[max(1rem,calc((100%_-_72rem)/2_+_1rem))] focus-visible:-outline-offset-4 sm:gap-6 [&::-webkit-scrollbar]:hidden`}
        >
          {kitchen.steps.map((step, index) => (
            <li
              key={step.title}
              className={`${styles.card} ${homeStyles.zoomOnHover} group relative isolate aspect-[3/4] w-[78vw] max-w-[22rem] shrink-0 snap-start overflow-hidden rounded-[2rem] bg-charcoal text-white shadow-[0_2rem_3rem_-2rem] shadow-charcoal/60 sm:w-[20rem] lg:w-[22rem]`}
            >
              <Image
                src={step.photo.src}
                alt={step.photo.alt}
                fill
                draggable={false}
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 20rem, 78vw"
                quality={90}
                className={`${homeStyles.zoom} -z-20 object-cover`}
              />
              <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-charcoal via-charcoal/30 to-transparent" />

              <span className="absolute left-5 top-5 grid size-14 place-items-center rounded-full bg-white shadow-lg shadow-charcoal/40 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                <Image src={step.icon} alt="" draggable={false} className="h-auto w-9" />
              </span>
              {/* Número gigante que asoma al pasar el cursor. */}
              <span
                aria-hidden
                className="absolute -right-3 top-2 text-[6rem] font-bold leading-none text-white/20 transition-[translate,color] duration-500 group-hover:-translate-x-2 group-hover:text-white/40"
              >
                {pad(index + 1)}
              </span>

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="text-2xl font-bold sm:text-3xl">{step.title}</h3>
                <span aria-hidden className="h-1 w-8 rounded-full bg-aqua transition-[width] duration-500 group-hover:w-16" />
                <p className="text-lg leading-snug text-white/90">{step.text}</p>
              </div>
            </li>
          ))}

          {/* Última "tarjeta": el lettering de la marca cierra el recorrido. */}
          <li className="grid aspect-[3/4] w-[78vw] max-w-[22rem] shrink-0 snap-start place-items-center rounded-[2rem] border-2 border-dashed border-crimson/30 p-8 sm:w-[20rem] lg:w-[22rem]">
            <Image
              src={kitchen.lettering.src}
              alt={kitchen.lettering.alt}
              draggable={false}
              className={`${styles.stamp} h-auto w-full max-w-[15rem]`}
            />
          </li>
        </ol>

        <div aria-hidden className="mx-auto mt-6 w-full max-w-6xl px-4">
          <div className="h-1 overflow-hidden rounded-full bg-charcoal/10">
            <div
              className={`${styles.progress} ${styles.kitchenBar} h-full rounded-full bg-crimson`}
              style={{ scale: `${Math.max(0.12, state.progress)} 1` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
