"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { hero } from "@/presentation/components/home/home-content";
import styles from "@/presentation/components/home/home.module.css";

/**
 * Foto en forma de arco (el sol que sale) con rayos que giran detrás e íconos que
 * flotan y siguen sutilmente al cursor. Solo la foto es contenido; lo demás es decorativo.
 */
export function HeroOrbit() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const canHover = window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)");
    if (!el || !canHover.matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = el.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        el.style.setProperty("--mx", Math.max(-1, Math.min(1, x)).toFixed(3));
        el.style.setProperty("--my", Math.max(-1, Math.min(1, y)).toFixed(3));
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[17rem] sm:max-w-[24rem] lg:max-w-[28rem]">
      {/* Rayos centrados en el arco de la foto */}
      <div aria-hidden className="absolute inset-x-[-16%] top-[-12.8%] aspect-square">
        <div className={styles.rays} />
        <div className={styles.raysAccent} />
      </div>

      <div
        className={`${styles.parallax} relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-charcoal shadow-[0_2.5rem_4rem_-1.5rem] shadow-charcoal/70 ring-8 ring-white/15`}
        style={{ "--depth": -8 } as CSSProperties}
      >
        <Image
          src={hero.photo.src}
          alt={hero.photo.alt}
          fill
          preload
          sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 17rem"
          className="object-cover"
        />
      </div>

      {/* Sello con el personaje de la marca: el isotipo no se altera, solo se coloca. */}
      <div
        aria-hidden
        className="absolute -bottom-6 -left-4 grid size-28 place-items-center rounded-full bg-white shadow-xl shadow-charcoal/40 ring-4 ring-white/40 sm:-left-10 sm:size-32"
      >
        <div className="flex flex-col items-center gap-1">
          <Image src={hero.isotipo} alt="" className="h-auto w-20" />
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-crimson">{hero.since}</span>
        </div>
      </div>

      {hero.orbit.map((icon, index) => (
        <span
          key={icon.src.src}
          aria-hidden
          className={`${styles.parallax} ${styles.badge} absolute ${icon.position} ${icon.size}`}
          style={{ "--depth": icon.depth } as CSSProperties}
        >
          <span
            className={`${styles.float} grid size-full place-items-center rounded-full bg-white shadow-[0_1rem_2rem_-0.5rem] shadow-charcoal/50 ring-4 ring-white/30`}
            style={{ "--delay": `${index * -0.9}s` } as CSSProperties}
          >
            <Image src={icon.src} alt="" className="h-auto w-[62%]" />
          </span>
        </span>
      ))}
    </div>
  );
}
