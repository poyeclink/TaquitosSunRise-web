import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { aboutHero } from "@/presentation/components/about/about-content";
import motion from "@/presentation/components/motion/motion.module.css";
import { PointerField } from "@/presentation/components/motion/pointer-fx";
import homeStyles from "@/presentation/components/home/home.module.css";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

export function AboutHero({ foundedYear }: { foundedYear: number }) {
  return (
    <section aria-labelledby="nosotros-title" className="relative isolate overflow-hidden bg-charcoal text-white">
      {/* Foto del local con parallax; el velo la oscurece hacia el texto. */}
      <div aria-hidden className={`${motion.heroParallax} absolute -inset-y-[10%] inset-x-0 -z-20`}>
        <Image
          src={aboutHero.photo.src}
          alt=""
          fill
          sizes="100vw"
          quality={90}
          preload
          className={`${motion.heroPhoto} object-cover`}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-charcoal via-charcoal/80 to-charcoal/40 md:bg-linear-to-r md:from-charcoal md:via-charcoal/80 md:to-charcoal/20"
      />

      <PointerField className="relative">
        <div
          className={`${motion.heroExit} mx-auto grid max-w-6xl items-center gap-12 px-4 pb-28 pt-14 sm:pt-20 md:grid-cols-[1.35fr_0.65fr] md:gap-8 md:pb-36 lg:min-h-[min(calc(100svh-6.5rem),50rem)]`}
        >
          <div className="flex flex-col items-start gap-6">
            <p
              className={`${motion.rise} rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] backdrop-blur-sm sm:text-sm`}
              style={order(0)}
            >
              {aboutHero.eyebrow}
            </p>

            <h1 id="nosotros-title" className="text-balance text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              <span className={`${motion.rise} block`} style={order(1)}>
                {aboutHero.title}
              </span>
              <span className={`${motion.rise} block`} style={order(2)}>
                {aboutHero.titleAccent(foundedYear)}
                <span aria-hidden className="ml-3 inline-block h-2 w-14 rounded-full bg-aqua align-middle sm:w-20" />
              </span>
            </h1>

            <Image
              src={aboutHero.lettering.src}
              alt={aboutHero.lettering.alt}
              className={`${motion.rise} h-auto w-56 sm:w-72`}
              style={order(3)}
            />

            <p className={`${motion.rise} max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl`} style={order(4)}>
              {aboutHero.lead}
            </p>

            <div className={`${motion.rise} flex flex-wrap gap-3`} style={order(5)}>
              <a
                href="#camino"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-lg font-bold text-crimson shadow-lg shadow-charcoal/30 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-white"
              >
                Nuestro camino
                <span aria-hidden className={`${homeStyles.nudge} transition-transform`}>
                  ↓
                </span>
              </a>
              <Link
                href="/menu"
                className="inline-flex items-center rounded-full border-2 border-white/70 px-7 py-3.5 text-lg font-bold transition hover:bg-white/10 focus-visible:outline-white"
              >
                Ver el menú
              </Link>
            </div>
          </div>

          {/* Sello de años: el sol de la marca con rayos que giran e íconos que siguen al cursor. */}
          <div aria-hidden className={`${motion.rise} hidden justify-center md:flex`} style={order(4)}>
            <div className="relative grid aspect-square w-full max-w-[21rem] place-items-center">
              <div className={homeStyles.rays} />
              <div className={homeStyles.raysAccent} />
              <div
                className={`${homeStyles.parallax} relative grid size-[58%] place-content-center rounded-full bg-crimson text-center shadow-2xl shadow-charcoal/50 ring-8 ring-white/15`}
                style={{ "--depth": 10 } as CSSProperties}
              >
                <span className="block text-6xl font-bold leading-none lg:text-7xl">{aboutHero.years}</span>
                <span className="mx-auto mt-2 block max-w-[7rem] text-xs font-bold uppercase leading-tight tracking-widest">
                  {aboutHero.yearsLabel}
                </span>
              </div>
              {aboutHero.floaters.map((floater, index) => (
                <span
                  key={floater.src.src}
                  className={`${homeStyles.parallax} absolute ${floater.position}`}
                  style={{ "--depth": floater.depth } as CSSProperties}
                >
                  <span
                    className={`${motion.float} grid ${floater.size} place-items-center rounded-full bg-white shadow-xl shadow-charcoal/40`}
                    style={{ "--delay": `${index * -1.5}s` } as CSSProperties}
                  >
                    <Image src={floater.src} alt="" className="h-auto w-3/5" />
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </PointerField>

      {/* Horizonte: el mismo arco del home. */}
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
