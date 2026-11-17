import Image from "next/image";
import type { ContactInfo } from "@/core/domain/restaurant/restaurant";
import { ContactForm, type ContactFormAction } from "@/presentation/components/contact/contact-form";
import { formCopy, visitCard } from "@/presentation/components/contact/contact-content";
import homeStyles from "@/presentation/components/home/home.module.css";
import motion from "@/presentation/components/motion/motion.module.css";
import { RevealText } from "@/presentation/components/motion/reveal-text";
import { TodoNote } from "@/presentation/components/todo-note";

/** Formulario y, al lado, una tarjeta fija con los datos para visitarnos. */
export function ContactSection({ action, contact }: { action: ContactFormAction; contact: ContactInfo }) {
  const details = [
    { label: "Dirección", value: contact.address, todo: "dirección del cliente" },
    { label: "Horario", value: contact.hours, todo: "horario del cliente" },
    { label: "Teléfono", value: contact.phone, todo: "teléfono del cliente" },
    { label: "Redes sociales", value: null, todo: "enlaces a redes sociales" },
  ];

  return (
    <section id="formulario" aria-labelledby="formulario-title" className="bg-white px-4 pb-20 pt-16 sm:pb-28 sm:pt-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
        <div className={`${motion.grow} rounded-[2rem] bg-white p-6 shadow-[0_2rem_5rem_-2.5rem] shadow-charcoal/40 ring-1 ring-charcoal/10 sm:rounded-[2.5rem] sm:p-10 lg:p-12`}>
          <header className="mb-8 sm:mb-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-crimson">{formCopy.eyebrow}</p>
            <h2 id="formulario-title" className="text-balance text-4xl sm:text-5xl">
              <RevealText text={formCopy.title} />
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed">{formCopy.lead}</p>
          </header>
          <ContactForm action={action} />
        </div>

        {/* Tarjeta para visitarnos: fija mientras se llena el formulario (si cabe en pantalla). */}
        <aside
          aria-label="Visítanos"
          className="lg:self-start lg:[@media(min-height:46rem)]:sticky lg:[@media(min-height:46rem)]:top-28"
        >
          <div className={`${motion.stagger} overflow-hidden rounded-[2rem] bg-charcoal text-white shadow-[0_2rem_4rem_-2rem] shadow-charcoal/60 sm:rounded-[2.5rem]`}>
            <div className={`${homeStyles.zoomOnHover} relative aspect-[16/10] overflow-hidden`}>
              <div aria-hidden className={`${motion.drift} absolute inset-x-0 -inset-y-[10%]`}>
                <Image
                  src={visitCard.photo.src}
                  alt={visitCard.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  quality={90}
                  className={`${homeStyles.zoom} object-cover`}
                />
              </div>
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-charcoal to-transparent to-60%" />
              <p className="absolute bottom-4 left-6 text-3xl font-bold">{visitCard.title}</p>
            </div>

            <dl className="grid gap-4 p-6 sm:p-8">
              {details.map(({ label, value, todo }) => (
                <div key={label} className="border-b border-white/15 pb-4 last:border-0 last:pb-0">
                  <dt className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">{label}</dt>
                  <dd className="mt-1 text-lg">{value ?? <TodoNote>{todo}</TodoNote>}</dd>
                </div>
              ))}
            </dl>

            <div className="flex justify-center bg-white px-6 py-5">
              <Image src={visitCard.lettering.src} alt={visitCard.lettering.alt} className={`${motion.stamp} h-auto w-44`} />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
