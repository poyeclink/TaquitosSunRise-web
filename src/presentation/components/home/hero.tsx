import Image from "next/image";
import Link from "next/link";
import { HeroOrbit } from "@/presentation/components/home/hero-orbit";
import { hero } from "@/presentation/components/home/home-content";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-crimson text-white">
      <Image src={hero.texture} alt="" fill sizes="100vw" className="-z-10 object-cover" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-24 pt-12 sm:pt-16 md:grid-cols-[1.05fr_1fr] md:gap-10 md:pb-32 lg:min-h-[min(calc(100svh-6.5rem),56rem)] lg:gap-16">
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
          <p className="rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] sm:text-sm">
            {hero.eyebrow}
          </p>
          <h1>
            <Image
              src={hero.title.src}
              alt={hero.title.alt}
              className="h-auto w-[min(100%,20rem)] sm:w-[26rem] lg:w-[30rem]"
              preload
            />
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-white/90 sm:text-xl">
            {hero.lead} <strong className="font-bold text-white">{hero.tagline}</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-lg font-bold text-crimson shadow-lg shadow-charcoal/30 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-white"
            >
              Ver el menú
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <a
              href="#historia"
              className="inline-flex items-center rounded-full border-2 border-white/70 px-7 py-3.5 text-lg font-bold transition hover:bg-white/10 focus-visible:outline-white"
            >
              Conócenos
            </a>
          </div>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-[0.18em] sm:gap-x-5 sm:text-sm sm:tracking-[0.2em] text-white/90 md:justify-start">
            {hero.services.map((service) => (
              <li key={service} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-aqua" />
                {service}
              </li>
            ))}
          </ul>
        </div>

        <HeroOrbit />
      </div>

      {/* Horizonte: el arco blanco evoca el sol que sale. */}
      <svg
        aria-hidden
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-px h-10 w-full fill-white sm:h-16"
      >
        <path d="M0 90C360 10 1080 10 1440 90Z" />
      </svg>
    </section>
  );
}
