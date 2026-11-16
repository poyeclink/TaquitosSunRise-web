"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { hero } from "@/presentation/components/home/home-content";
import styles from "@/presentation/components/home/home.module.css";

/** Lo que abre cada círculo: los íconos de la órbita y, al final, el sello del personaje. */
const ITEMS = [
  ...hero.orbit.map((icon) => ({ icon: icon.src, ...icon.reveal })),
  { icon: hero.isotipo, ...hero.sealReveal },
];
const SEAL = ITEMS.length - 1;
const SPARKS = Array.from({ length: 10 }, (_, index) => index * 36);

/**
 * Foto en forma de arco (el sol que sale) con rayos que giran detrás e íconos que flotan
 * y siguen sutilmente al cursor. Cada ícono (y el sello) abre una tarjeta con su lettering:
 * la tarjeta nace desde el círculo tocado, con un destello de chispas.
 */
export function HeroOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  // El contenido se queda mientras la tarjeta se cierra, para que no cambie a mitad de la animación.
  const [shown, setShown] = useState(0);
  // Cada toque reinicia el destello de ese círculo (cambia la `key`).
  const [bursts, setBursts] = useState(() => ITEMS.map(() => 0));
  const [touched, setTouched] = useState(false);
  const cardId = useId();
  const item = ITEMS[shown];

  // Parallax: los íconos siguen al cursor (solo con mouse y si se permiten animaciones).
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

  // Con la tarjeta abierta: Escape la cierra (y devuelve el foco); tocar fuera también.
  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(null);
      buttons.current[open]?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      const inside = cardRef.current?.contains(target) || buttons.current.some((button) => button?.contains(target));
      if (!inside) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const toggle = (index: number, event: MouseEvent) => {
    setTouched(true);
    if (open === index) {
      setOpen(null);
      return;
    }

    // La tarjeta crece desde el centro del círculo tocado.
    const card = cardRef.current;
    const box = ref.current?.getBoundingClientRect();
    const button = buttons.current[index]?.getBoundingClientRect();
    if (card && box && button) {
      const x = button.left + button.width / 2 - box.left - card.offsetLeft;
      const y = button.top + button.height / 2 - box.top - card.offsetTop;
      card.style.transformOrigin = `${Math.round(x)}px ${Math.round(y)}px`;
    }

    setShown(index);
    setOpen(index);
    setBursts((prev) => prev.map((count, position) => (position === index ? count + 1 : count)));
    // Con teclado (detail === 0), el foco pasa a la tarjeta.
    if (event.detail === 0) requestAnimationFrame(() => cardRef.current?.focus());
  };

  /** Atributos de accesibilidad de los círculos que abren la tarjeta. */
  const trigger = (index: number) => ({
    type: "button" as const,
    "aria-label": `${ITEMS[index].name}: ${ITEMS[index].kicker}`,
    "aria-expanded": open === index,
    "aria-controls": cardId,
  });

  /** Chispas que salen del círculo al abrirlo. */
  const burst = (index: number) =>
    bursts[index] > 0 && (
      <span key={bursts[index]} aria-hidden className={styles.burst}>
        {SPARKS.map((angle) => (
          <span key={angle} style={{ "--a": `${angle}deg` } as CSSProperties} />
        ))}
      </span>
    );

  /** Aro que late para invitar a tocar, hasta la primera interacción. */
  const ping = (index: number) =>
    !touched && <span aria-hidden className={styles.ping} style={{ "--delay": `${index * 0.55}s` } as CSSProperties} />;

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
          quality={90}
          className="object-cover"
        />
        {/* Con una tarjeta abierta, la foto se oscurece para darle protagonismo. */}
        <div
          aria-hidden
          className={`absolute inset-0 bg-charcoal/50 transition-opacity duration-500 ${open === null ? "opacity-0" : ""}`}
        />
      </div>

      {/* Sello con el personaje de la marca: el isotipo no se altera, solo se coloca. */}
      <button
        {...trigger(SEAL)}
        ref={(el) => {
          buttons.current[SEAL] = el;
        }}
        onClick={(event) => toggle(SEAL, event)}
        className={`absolute -bottom-6 -left-4 grid size-28 place-items-center rounded-full bg-white shadow-xl shadow-charcoal/40 ring-4 transition-[scale,box-shadow] duration-300 hover:scale-105 focus-visible:outline-white sm:-left-10 sm:size-32 ${
          open === SEAL ? "scale-105 ring-aqua" : "ring-white/40"
        }`}
      >
        {ping(SEAL)}
        {burst(SEAL)}
        <span className="flex flex-col items-center gap-1">
          <Image src={hero.isotipo} alt="" className="h-auto w-20" />
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-crimson">{hero.since}</span>
        </span>
      </button>

      {hero.orbit.map((icon, index) => (
        <span
          key={icon.src.src}
          className={`${styles.parallax} ${styles.badge} absolute ${icon.position} ${icon.size}`}
          style={{ "--depth": icon.depth } as CSSProperties}
        >
          <button
            {...trigger(index)}
            ref={(el) => {
              buttons.current[index] = el;
            }}
            onClick={(event) => toggle(index, event)}
            className={`${styles.float} relative grid size-full place-items-center rounded-full bg-white shadow-[0_1rem_2rem_-0.5rem] shadow-charcoal/50 ring-4 transition-[box-shadow] duration-300 focus-visible:outline-white ${
              open === index ? "ring-aqua" : "ring-white/30"
            }`}
            style={{ "--delay": `${index * -0.9}s` } as CSSProperties}
          >
            {ping(index)}
            {burst(index)}
            <Image src={icon.src} alt="" className="h-auto w-[62%]" />
          </button>
        </span>
      ))}

      {/* Tarjeta: una sola, se llena con el círculo elegido. Centrada con márgenes (sin transform)
          para poder calcular desde dónde crece. */}
      <div
        ref={cardRef}
        id={cardId}
        role="dialog"
        aria-modal="false"
        aria-labelledby={`${cardId}-title`}
        tabIndex={-1}
        className={`absolute inset-0 z-20 m-auto h-fit w-[min(19rem,calc(100vw-2rem))] rounded-[1.75rem] bg-white p-6 text-charcoal shadow-[0_2rem_4rem_-1rem] shadow-charcoal/60 ring-4 ring-white/40 duration-500 ease-[cubic-bezier(0.34,1.35,0.64,1)] focus-visible:outline-none motion-reduce:transition-none sm:p-7 ${
          // Al abrir, `visibility` cambia al instante (para poder recibir el foco);
          // al cerrar, espera a que termine el fundido.
          open === null ? "invisible scale-[0.2] opacity-0 transition-[scale,opacity,visibility]" : "transition-[scale,opacity]"
        }`}
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={() => {
            const last = open;
            setOpen(null);
            if (last !== null) buttons.current[last]?.focus();
          }}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-charcoal/[0.06] text-xl leading-none transition-colors hover:bg-charcoal/15"
        >
          <span aria-hidden>×</span>
        </button>

        <div className="mb-4 flex items-center gap-3 pr-8">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-crimson/[0.08]">
            <Image src={item.icon} alt="" className="h-auto w-8" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson">{item.kicker}</p>
            <h3 id={`${cardId}-title`} className="text-2xl font-bold leading-tight">
              {item.name}
            </h3>
          </div>
        </div>

        <Image
          key={shown}
          src={item.lettering.src}
          alt={item.lettering.alt}
          className={`${styles.letteringIn} h-20 w-full object-contain object-left sm:h-24`}
        />

        <p className="mt-4 text-base leading-relaxed">{item.text}</p>

        <Link
          href={item.cta.href}
          onClick={() => setOpen(null)}
          className="group mt-5 inline-flex items-center gap-2 rounded-full bg-crimson px-5 py-2.5 text-base font-bold text-white shadow-lg shadow-crimson/30 transition hover:-translate-y-0.5"
        >
          {item.cta.label}
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
