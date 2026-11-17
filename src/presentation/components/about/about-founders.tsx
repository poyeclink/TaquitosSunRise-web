import Image from "next/image";
import { founders } from "@/presentation/components/about/about-content";
import styles from "@/presentation/components/about/about.module.css";
import { RevealText } from "@/presentation/components/about/reveal-text";
import homeStyles from "@/presentation/components/home/home.module.css";
import { TodoNote } from "@/presentation/components/todo-note";

/** Historia de los fundadores. Mientras el cliente no la entregue, el texto queda como TODO visible. */
export function AboutFounders({ story }: { story: string | null }) {
  return (
    <section aria-labelledby="fundadores-title" className="bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-crimson">{founders.eyebrow}</p>
          <h2 id="fundadores-title" className="text-balance text-4xl sm:text-5xl lg:text-6xl">
            <RevealText text={founders.title} />
          </h2>
          <p className={`${homeStyles.reveal} mt-5 text-lg leading-relaxed sm:text-xl`}>{founders.lead}</p>
        </header>

        <article
          className={`${styles.grow} grid gap-8 overflow-hidden rounded-[2rem] bg-charcoal/[0.04] p-5 ring-1 ring-charcoal/10 sm:p-8 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12 md:p-10`}
        >
          <div className={`${homeStyles.zoomOnHover} relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-charcoal`}>
            <div aria-hidden className={`${styles.drift} absolute inset-x-0 -inset-y-[10%]`}>
              <Image
                src={founders.photo.src}
                alt={founders.photo.alt}
                fill
                sizes="(min-width: 1152px) 30rem, (min-width: 768px) 45vw, 100vw"
                quality={90}
                className={`${homeStyles.zoom} object-cover`}
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-5">
            <Image
              src={founders.lettering.src}
              alt={founders.lettering.alt}
              className={`${styles.stamp} h-auto w-44 -rotate-3 sm:w-52`}
            />
            <h3 className="text-3xl font-bold sm:text-4xl">{founders.heading}</h3>
            <p className="text-lg leading-relaxed sm:text-xl">
              {story ?? <TodoNote>historia de los fundadores: quiénes son, cómo empezaron en 1988 y qué los movió</TodoNote>}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
