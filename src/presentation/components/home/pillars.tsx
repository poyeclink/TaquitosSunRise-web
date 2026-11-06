import Image from "next/image";
import { pillars } from "@/presentation/components/home/home-content";
import styles from "@/presentation/components/home/home.module.css";

export function Pillars({ names }: { names: readonly string[] }) {
  return (
    <section aria-labelledby="pilares-title" className="bg-charcoal px-4 py-20 text-white sm:py-28">
      <header className={`${styles.reveal} mx-auto mb-12 max-w-2xl text-center sm:mb-16`}>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em]">Nuestros pilares</p>
        <h2 id="pilares-title" className="text-4xl sm:text-5xl">{names.join(" › ")}</h2>
      </header>

      <ol className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3 lg:gap-8">
        {names.map((name, index) => {
          const pillar = pillars[name];
          if (!pillar) return null;
          return (
            <li
              key={name}
              className={`${styles.reveal} ${styles.pillarCard} ${styles.wiggleOnHover} relative flex flex-col overflow-hidden rounded-[2rem] bg-white text-charcoal`}
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-charcoal">
                <Image
                  src={pillar.photo.src}
                  alt={pillar.photo.alt}
                  fill
                  sizes="(min-width: 1152px) 22rem, (min-width: 768px) 31vw, 100vw"
                  className={`${styles.pillarPhoto} object-cover`}
                />
                <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-sm font-bold tracking-[0.2em] text-crimson">
                  0{index + 1}
                </span>
              </div>

              <div className="relative flex flex-1 flex-col p-7 pt-10 sm:p-9 sm:pt-11">
                <span
                  className={`${styles.wiggle} absolute -top-8 right-7 grid size-16 place-items-center rounded-full bg-white shadow-lg shadow-charcoal/20 sm:right-9`}
                >
                  <Image src={pillar.icon} alt="" className="h-auto w-10" />
                </span>
                <h3 className="mb-5 text-4xl font-bold">{name}</h3>
                <div className="mb-6 flex h-28 items-center">
                  <Image
                    src={pillar.lettering.src}
                    alt={pillar.lettering.alt}
                    className={`${styles.pillarLettering} h-auto max-h-28 w-auto max-w-full`}
                  />
                </div>
                <p className="mt-auto text-lg leading-relaxed">{pillar.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
