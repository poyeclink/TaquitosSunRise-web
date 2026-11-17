import Image from "next/image";
import type { CSSProperties } from "react";
import { community } from "@/presentation/components/about/about-content";
import motion from "@/presentation/components/motion/motion.module.css";
import { Tilt } from "@/presentation/components/motion/pointer-fx";
import { RevealText } from "@/presentation/components/motion/reveal-text";
import homeStyles from "@/presentation/components/home/home.module.css";

/** "Cada persona importa: quien llega, quien trabaja y quien vuelve" (manifiesto). */
export function AboutCommunity() {
  return (
    <section
      aria-labelledby="comunidad-title"
      className="relative isolate overflow-hidden bg-crimson px-4 py-20 text-white sm:py-28"
    >
      <Image src={community.texture} alt="" fill sizes="100vw" className={`${motion.drift} -z-10 scale-125 object-cover`} />

      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-2xl sm:mb-16">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em]">{community.eyebrow}</p>
          <h2 id="comunidad-title" className="text-balance text-4xl sm:text-5xl lg:text-6xl">
            <RevealText text={community.title} />
          </h2>
        </header>

        <ul className="grid gap-5 md:grid-cols-3">
          {community.people.map((person, index) => (
            <li
              key={person.title}
              className={`${motion.stagger} ${index === 1 ? "md:translate-y-10" : ""}`}
              style={{ "--i": index } as CSSProperties}
            >
              <Tilt
                className={`${homeStyles.zoomOnHover} group isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[2rem] bg-charcoal p-6 shadow-[0_2rem_4rem_-2rem] shadow-charcoal/70 sm:p-8 md:aspect-[3/4]`}
              >
                {/* Parallax interno: la foto se desplaza dentro del marco con el scroll. */}
                <div aria-hidden className={`${motion.drift} absolute inset-x-0 -inset-y-[10%] -z-20`}>
                  <Image
                    src={person.photo.src}
                    alt={person.photo.alt}
                    fill
                    sizes="(min-width: 1152px) 23rem, (min-width: 768px) 32vw, 100vw"
                    quality={90}
                    className={`${homeStyles.zoom} object-cover`}
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-linear-to-t from-charcoal via-charcoal/40 to-transparent transition-opacity duration-500 group-hover:opacity-90"
                />
                <span className="mb-auto grid size-14 place-items-center rounded-full bg-white shadow-lg shadow-charcoal/40 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                  <Image src={person.icon} alt="" className="h-auto w-9" />
                </span>
                <h3 className="text-3xl font-bold sm:text-4xl">{person.title}</h3>
                <span aria-hidden className="mt-3 h-1 w-10 rounded-full bg-aqua transition-[width] duration-500 group-hover:w-20" />
                {/* En escritorio el texto se asoma al pasar el cursor; en táctil siempre está visible. */}
                <div className="grid transition-[grid-template-rows,opacity] duration-500 ease-out [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:grid-rows-[1fr] [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100">
                  <p className="min-h-0 overflow-hidden pt-3 text-lg leading-snug text-white/90">{person.text}</p>
                </div>
              </Tilt>
            </li>
          ))}
        </ul>

        <div
          className={`${motion.grow} mt-16 grid items-center gap-8 rounded-[2rem] bg-white p-7 text-charcoal shadow-2xl shadow-charcoal/40 sm:p-10 md:mt-24 md:grid-cols-[auto_1fr] md:gap-10`}
        >
          <span className={`${motion.stamp} grid size-20 place-items-center rounded-full bg-crimson/[0.08] sm:size-24`}>
            <Image src={community.early.icon} alt="" className="h-auto w-12 sm:w-14" />
          </span>
          <div>
            <h3 className="text-2xl font-bold text-crimson sm:text-3xl">{community.early.title}</h3>
            <p className="mt-2 max-w-2xl text-lg leading-relaxed">{community.early.text}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {community.early.groups.map((group, index) => (
                <li
                  key={group}
                  className={`${motion.pop} flex cursor-default items-center gap-2 rounded-full border border-charcoal/15 px-4 py-1.5 text-sm font-bold transition-colors duration-300 hover:border-crimson hover:bg-crimson hover:text-white sm:text-base`}
                  style={{ "--i": index } as CSSProperties}
                >
                  <span aria-hidden className="size-1.5 rounded-full bg-aqua" />
                  {group}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
