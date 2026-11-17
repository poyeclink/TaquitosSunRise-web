"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import styles from "@/presentation/components/about/about.module.css";
import motion from "@/presentation/components/motion/motion.module.css";
import type { Photo } from "@/presentation/media/photos";

export interface StackItem {
  readonly label: string;
  readonly text: string;
  readonly icon: StaticImageData;
  readonly photo: Photo;
  readonly tags: readonly string[];
}

const pad = (value: number) => String(value).padStart(2, "0");

/** Fondo de cada tarjeta, en orden: alterna para que el apilado se lea. */
const THEMES = [
  "bg-white text-charcoal",
  "bg-crimson text-white",
  "bg-white text-charcoal",
] as const;

/**
 * Qué · Por qué · Cómo como tarjetas que se apilan con el scroll: cada una se queda fija
 * y la siguiente la tapa; la de abajo se encoge y oscurece (`--cover`, de 0 a 1).
 * El encogido lo aplica el CSS solo si se permite el movimiento.
 */
export function PurposeStack({ items }: { items: readonly StackItem[] }) {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const cards = [...el.querySelectorAll<HTMLElement>("[data-card]")];
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        cards.forEach((card, index) => {
          const next = cards[index + 1];
          if (!next) return;
          const a = card.getBoundingClientRect();
          const b = next.getBoundingClientRect();
          const cover = Math.min(1, Math.max(0, 1 - (b.top - a.top) / a.height));
          card.style.setProperty("--cover", cover.toFixed(3));
        });
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <ol ref={list} className="grid gap-6 sm:gap-10">
      {items.map((item, index) => (
        <li
          key={item.label}
          className="sticky"
          // Cada tarjeta se fija un poco más abajo que la anterior: se ven los bordes de la pila.
          style={{ top: `calc(6.5rem + ${index * 1.25}rem)` }}
        >
          <article
            data-card
            className={`${styles.stackCard} ${THEMES[index % THEMES.length]} group relative grid overflow-hidden rounded-[2rem] shadow-[0_-1rem_3rem_-1rem] shadow-charcoal/60 sm:rounded-[2.5rem] md:min-h-[26rem] md:grid-cols-[1fr_1.05fr]`}
          >
            {/* Velo que oscurece la tarjeta cuando la siguiente la tapa (solo opacidad: barato de animar). */}
            <div aria-hidden className={styles.stackShade} />
            <div className="relative aspect-[16/10] overflow-hidden md:order-2 md:aspect-auto">
              <Image
                src={item.photo.src}
                alt={item.photo.alt}
                fill
                sizes="(min-width: 1152px) 36rem, (min-width: 768px) 50vw, 100vw"
                quality={90}
                className="object-cover transition-[scale] duration-[1.2s] ease-out group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute bottom-4 right-5 text-[5rem] font-bold leading-none text-white/80 drop-shadow-lg sm:text-[7rem]"
              >
                {pad(index + 1)}
              </span>
            </div>

            <div className="flex flex-col items-start gap-5 p-7 sm:p-10 lg:p-12">
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-full bg-white shadow-lg shadow-charcoal/25 ring-1 ring-charcoal/10 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 sm:size-16">
                  <Image src={item.icon} alt="" className="h-auto w-9 sm:w-10" />
                </span>
                <span className="text-sm font-bold uppercase tracking-[0.25em] opacity-80">
                  {pad(index + 1)} / {pad(items.length)}
                </span>
              </div>
              <h3 className="text-4xl font-bold sm:text-5xl">{item.label}</h3>
              <span aria-hidden className="h-1 w-12 rounded-full bg-aqua transition-[width] duration-500 group-hover:w-24" />
              <p className="max-w-md text-lg leading-relaxed sm:text-xl">{item.text}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag, tagIndex) => (
                  <li
                    key={tag}
                    className={`${motion.pop} rounded-full border border-current/25 px-4 py-1.5 text-sm font-bold`}
                    style={{ "--i": tagIndex } as CSSProperties}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
