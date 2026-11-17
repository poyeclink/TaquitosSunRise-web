import type { CSSProperties } from "react";
import { facts } from "@/presentation/components/about/about-content";
import styles from "@/presentation/components/about/about.module.css";

/** Número que cuenta al entrar en pantalla. El valor real queda en texto para lectores y SEO. */
function Count({ to, from = 0, prefix = "" }: { to: number; from?: number; prefix?: string }) {
  return (
    <>
      <span className="sr-only">
        {prefix}
        {to}
      </span>
      <span aria-hidden>
        {prefix}
        <span className={styles.count} style={{ "--to": to, "--from": from } as CSSProperties} />
      </span>
    </>
  );
}

export function AboutFacts({ foundedYear, pillars }: { foundedYear: number; pillars: readonly string[] }) {
  const items = [
    { label: facts.founded.label, value: <Count to={foundedYear} from={foundedYear - 40} />, big: true },
    { label: facts.years.label, value: <Count to={facts.years.value} prefix={facts.years.prefix} />, big: true },
    { label: facts.pillars.label, value: pillars.join(" › "), big: false },
    { label: facts.services.label, value: facts.services.value, big: false },
  ];

  return (
    <section aria-label="Sunrise Taquitos en cifras" className="bg-white px-4 pb-6 pt-10 sm:pt-14">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map(({ label, value, big }, index) => (
          <div
            key={label}
            className={`${styles.stagger} group relative flex flex-col-reverse justify-end gap-2 overflow-hidden rounded-[1.75rem] bg-white p-5 ring-1 ring-charcoal/10 transition duration-500 hover:-translate-y-1 hover:shadow-[0_1.5rem_3rem_-1.5rem] hover:shadow-crimson/40 hover:ring-crimson/30 sm:p-8`}
            style={{ "--i": index } as CSSProperties}
          >
            {/* Barra que se llena al pasar el cursor. */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-crimson transition-transform duration-500 group-hover:scale-x-100"
            />
            <dt className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/80 sm:text-sm">{label}</dt>
            <dd
              className={`origin-left font-bold leading-none text-crimson transition-transform duration-500 group-hover:scale-105 ${
                big ? "text-5xl sm:text-6xl" : "text-xl leading-tight sm:text-2xl"
              }`}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
