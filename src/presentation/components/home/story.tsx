import Image from "next/image";
import { story } from "@/presentation/components/home/home-content";
import { PurposeTabs } from "@/presentation/components/home/purpose-tabs";
import styles from "@/presentation/components/home/home.module.css";

export function Story({ mission, vision }: { mission: string; vision: string }) {
  return (
    <section id="historia" aria-labelledby="historia-title" className="bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Collage: fijo en escritorio solo si la pantalla tiene altura suficiente. */}
        <aside className="lg:self-start lg:[@media(min-height:46rem)]:sticky lg:[@media(min-height:46rem)]:top-28">
          <div className="relative mx-auto max-w-md pb-14 pr-10 sm:pr-16 lg:max-w-none">
            <div
              className={`${styles.zoomOnHover} relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-charcoal shadow-[0_2rem_4rem_-2rem] shadow-charcoal/50`}
            >
              <Image
                src={story.photos.main.src}
                alt={story.photos.main.alt}
                fill
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 24rem, 80vw"
                className={`${styles.zoom} object-cover`}
              />
            </div>
            <div className="absolute bottom-0 right-0 aspect-square w-[46%] overflow-hidden rounded-[1.5rem] bg-charcoal shadow-xl shadow-charcoal/30 ring-8 ring-white">
              <Image
                src={story.photos.detail.src}
                alt={story.photos.detail.alt}
                fill
                sizes="(min-width: 1024px) 13rem, 40vw"
                className="object-cover"
              />
            </div>
            <p className="absolute -left-2 top-8 rounded-3xl bg-crimson px-5 py-4 text-white shadow-xl shadow-crimson/30 sm:-left-6">
              <span className="block text-5xl font-bold leading-none sm:text-6xl">{story.years}</span>
              <span className="mt-1 block max-w-[7rem] text-sm font-bold leading-tight">{story.yearsLabel}</span>
            </p>
          </div>
        </aside>

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-crimson">{story.eyebrow}</p>
          <h2 id="historia-title" className="mb-10 text-balance text-4xl sm:text-5xl">
            {story.title}
          </h2>

          <div className="space-y-6 text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
            {story.manifesto.map((line) => (
              <p key={line} className={`${styles.ink}`}>
                {line}
              </p>
            ))}
          </div>

          <Image
            src={story.signature.src}
            alt={story.signature.alt}
            className={`${styles.reveal} mt-10 h-auto w-64 sm:w-80`}
          />

          <div className={`${styles.reveal} mt-16`}>
            <PurposeTabs
              items={[
                { label: "Misión", text: mission },
                { label: "Visión", text: vision },
                { label: "Nuestro porqué", text: story.why },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
