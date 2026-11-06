import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { closing } from "@/presentation/components/home/home-content";
import styles from "@/presentation/components/home/home.module.css";

/** Posiciones de los íconos decorativos alrededor de la tarjeta final. */
const SPOTS = [
  "left-[6%] top-[14%]",
  "right-[8%] top-[10%]",
  "bottom-[14%] left-[10%]",
  "bottom-[10%] right-[6%]",
];

export function ClosingCta() {
  return (
    <section aria-labelledby="cierre-title" className="relative isolate overflow-hidden px-4 py-24 sm:py-32">
      <Image src={closing.photo.src} alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-charcoal/65" />

      {closing.icons.map((icon, index) => (
        <span
          key={icon.src}
          aria-hidden
          className={`${styles.float} absolute -z-10 hidden size-20 place-items-center rounded-full bg-white shadow-xl shadow-charcoal/40 md:grid lg:size-24 ${SPOTS[index]}`}
          style={{ "--delay": `${index * -1.4}s` } as CSSProperties}
        >
          <Image src={icon} alt="" className="h-auto w-3/5" />
        </span>
      ))}

      <div
        className={`${styles.reveal} mx-auto flex max-w-xl flex-col items-center gap-7 rounded-[2rem] bg-white px-6 py-12 text-center shadow-2xl shadow-charcoal/50 sm:px-12 sm:py-14`}
      >
        <h2 id="cierre-title">
          <Image src={closing.title.src} alt={closing.title.alt} className="h-auto w-60 sm:w-72" />
        </h2>
        <p className="text-xl leading-relaxed sm:text-2xl">{closing.text}</p>
        <Link
          href="/menu"
          className="group inline-flex items-center gap-2 rounded-full bg-crimson px-8 py-4 text-lg font-bold text-white shadow-lg shadow-crimson/30 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          Ver el menú
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
