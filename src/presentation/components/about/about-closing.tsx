import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { ContactInfo } from "@/core/domain/restaurant/restaurant";
import { aboutClosing } from "@/presentation/components/about/about-content";
import styles from "@/presentation/components/about/about.module.css";
import { TodoNote } from "@/presentation/components/todo-note";

/** Cierre: "Tu casa always" y dónde encontrarnos (datos del perfil; TODO si faltan). */
export function AboutClosing({ contact }: { contact: ContactInfo }) {
  const visit = [
    { label: "Dirección", value: contact.address, todo: "dirección del cliente" },
    { label: "Horario", value: contact.hours, todo: "horario del cliente" },
    { label: "Teléfono", value: contact.phone, todo: "teléfono del cliente" },
  ];

  return (
    <section aria-labelledby="visita-title" className="relative isolate overflow-hidden px-4 py-20 sm:py-28">
      {/* La foto aérea se aleja mientras la tarjeta sube a primer plano. */}
      <Image
        src={aboutClosing.photo.src}
        alt=""
        fill
        sizes="100vw"
        quality={90}
        className={`${styles.zoomOut} -z-20 object-cover`}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-charcoal/70" />

      <div
        className={`${styles.grow} mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-charcoal/50 md:grid-cols-[1.1fr_0.9fr]`}
      >
        <div className="flex flex-col items-start gap-6 p-7 sm:p-12">
          <h2 id="visita-title">
            <Image
              src={aboutClosing.lettering.src}
              alt={aboutClosing.lettering.alt}
              className={`${styles.stamp} h-auto w-56 sm:w-64`}
            />
          </h2>
          <p className="text-xl leading-relaxed sm:text-2xl">{aboutClosing.text}</p>
          <Link
            href="/menu"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-crimson px-8 py-4 text-lg font-bold text-white shadow-lg shadow-crimson/30 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            {/* Brillo que cruza el botón al pasar el cursor. */}
            <span
              aria-hidden
              className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 transition-[left] duration-700 ease-out group-hover:left-[120%]"
            />
            Ver el menú
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-6 bg-crimson p-7 text-white sm:p-12">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-full bg-white">
              <Image src={aboutClosing.icon} alt="" className="h-auto w-9" />
            </span>
            <h3 className="text-sm font-bold uppercase tracking-[0.25em]">Visítanos</h3>
          </div>
          <dl className="grid gap-4">
            {visit.map(({ label, value, todo }, index) => (
              <div
                key={label}
                className={`${styles.stagger} border-b border-white/20 pb-4 last:border-0 last:pb-0`}
                style={{ "--i": index + 1 } as CSSProperties}
              >
                <dt className="text-sm text-white/80">{label}</dt>
                <dd className="mt-1 text-lg">{value ?? <TodoNote>{todo}</TodoNote>}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
