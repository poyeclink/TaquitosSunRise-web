import Image from "next/image";
import { personality } from "@/presentation/components/home/home-content";
import styles from "@/presentation/components/home/home.module.css";

/** Cinta infinita con la personalidad de la marca. Se pausa al pasar el cursor. */
export function PersonalityMarquee() {
  return (
    <section aria-label="Nuestra personalidad" className={`${styles.marqueeTrack} overflow-hidden bg-white py-6 sm:py-8`}>
      <div className={`${styles.marquee}`}>
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
            {personality.map(({ trait, meaning, icon }) => (
              <li key={trait} className="flex items-center gap-8 sm:gap-12">
                <span className="whitespace-nowrap text-2xl font-bold sm:text-3xl">
                  {trait}
                  <span className="ml-2 font-normal text-charcoal/80">{meaning}</span>
                </span>
                <Image src={icon} alt="" loading="eager" className="h-auto w-10 sm:w-12" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
