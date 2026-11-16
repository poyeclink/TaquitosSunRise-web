import Image from "next/image";
import { story } from "@/presentation/components/home/home-content";
import { PurposeTabs } from "@/presentation/components/home/purpose-tabs";
import styles from "@/presentation/components/home/home.module.css";

export function Story({ mission, vision }: { mission: string; vision: string }) {
  const [lead, ...rest] = story.manifesto;

  return (
    <section id="historia" aria-labelledby="historia-title" className="bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Collage: fijo en escritorio solo si la pantalla tiene altura suficiente. */}
          <aside className="lg:self-start lg:[@media(min-height:44rem)]:sticky lg:[@media(min-height:44rem)]:top-28">
            <div className={`${styles.reveal} relative mx-auto max-w-sm pb-12 pr-8 sm:pr-12 lg:max-w-none`}>
              {/* Foto en arco: el mismo amanecer del hero. */}
              <div
                className={`${styles.zoomOnHover} relative aspect-[4/5] overflow-hidden rounded-b-[2rem] rounded-t-full bg-charcoal shadow-[0_2rem_4rem_-2rem] shadow-charcoal/50`}
              >
                <Image
                  src={story.photos.main.src}
                  alt={story.photos.main.alt}
                  fill
                  sizes="(min-width: 1024px) 28rem, (min-width: 640px) 22rem, 80vw"
                  quality={90}
                  className={`${styles.zoom} object-cover`}
                />
              </div>
              <div className="absolute bottom-0 right-0 aspect-square w-[42%] overflow-hidden rounded-full bg-charcoal shadow-xl shadow-charcoal/30 ring-8 ring-white">
                <Image
                  src={story.photos.detail.src}
                  alt={story.photos.detail.alt}
                  fill
                  sizes="(min-width: 1024px) 12rem, 36vw"
                  quality={90}
                  className="object-cover"
                />
              </div>
              <p className="absolute -left-2 bottom-16 grid size-32 place-content-center rounded-full bg-crimson text-center text-white shadow-xl shadow-crimson/30 ring-8 ring-white sm:-left-6 sm:size-36">
                <span className="block text-5xl font-bold leading-none">{story.years}</span>
                <span className="mx-auto mt-1 block max-w-[6rem] text-xs font-bold uppercase leading-tight tracking-widest">
                  {story.yearsLabel}
                </span>
              </p>
            </div>
          </aside>

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-crimson">{story.eyebrow}</p>
            <h2 id="historia-title" className="text-balance text-4xl sm:text-5xl lg:text-6xl">
              {story.title}
            </h2>

            {/* Manifiesto con línea de tiempo: el sol baja de 1988 a hoy a medida que se lee. */}
            <div className={`${styles.storyRail} relative my-16 pl-14 sm:pl-20`}>
              <div aria-hidden className="absolute inset-y-0 left-5 w-10 -translate-x-1/2 sm:left-7">
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 text-sm font-bold tracking-[0.2em] text-crimson">
                  {story.timeline.start}
                </span>
                <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-charcoal/15" />
                <span
                  className={`${styles.storyRailFill} absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-crimson`}
                />
                <span
                  className={`${styles.storySun} absolute left-0 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow-md shadow-charcoal/20 ring-1 ring-charcoal/10`}
                >
                  <Image src={story.sunIcon} alt="" className="h-auto w-7" />
                </span>
                <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-sm font-bold uppercase tracking-[0.2em] text-crimson">
                  {story.timeline.end}
                </span>
              </div>

              <div className="space-y-7">
                <p className={`${styles.ink} text-balance text-2xl font-medium leading-snug sm:text-4xl sm:leading-tight`}>
                  {lead}
                </p>
                {rest.map((line) => (
                  <p key={line} className={`${styles.ink} text-xl leading-relaxed sm:text-2xl sm:leading-relaxed`}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <Image
              src={story.signature.src}
              alt={story.signature.alt}
              className={`${styles.reveal} h-auto w-64 sm:w-80`}
            />
          </div>
        </div>

        <div className={`${styles.reveal} mt-20 sm:mt-28`}>
          <PurposeTabs
            items={[
              { label: "Misión", text: mission },
              { label: "Visión", text: vision },
              { label: "Nuestro porqué", text: story.why },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
