import Image from "next/image";
import { band } from "@/presentation/components/about/about-content";
import styles from "@/presentation/components/about/about.module.css";

/** Repite la fila para que nunca se vea el final mientras se desplaza. */
const REPEAT = 3;

function Row({ words, className }: { words: readonly string[]; className: string }) {
  return (
    <div className={`${styles.bandRow} ${className}`}>
      {Array.from({ length: REPEAT }, () => words)
        .flat()
        .map((word, index) => (
          <span key={index} className="flex items-center gap-[clamp(1.5rem,4vw,3.5rem)]">
            {word}
            <Image src={band.icon} alt="" className="h-auto w-[0.6em]" />
          </span>
        ))}
    </div>
  );
}

/** Cinta decorativa: dos filas gigantes que viajan en sentidos opuestos con el scroll. */
export function ScrollBand({ pillars }: { pillars: readonly string[] }) {
  return (
    <section aria-hidden className="overflow-hidden bg-white py-14 sm:py-20">
      <Row words={pillars} className={`${styles.bandLeft} text-crimson`} />
      <Row words={band.second} className={`${styles.bandRight} ${styles.outline} mt-2`} />
    </section>
  );
}
