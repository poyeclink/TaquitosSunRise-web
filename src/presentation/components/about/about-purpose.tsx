import Image from "next/image";
import type { CSSProperties } from "react";
import { purpose } from "@/presentation/components/about/about-content";
import styles from "@/presentation/components/about/about.module.css";
import { PurposeStack } from "@/presentation/components/about/purpose-stack";
import { RevealText } from "@/presentation/components/about/reveal-text";
import { StatementSwitch } from "@/presentation/components/about/statement-switch";
import homeStyles from "@/presentation/components/home/home.module.css";

/** Quiénes somos: Qué · Por qué · Cómo apilados con el scroll y, debajo, misión y visión. */
export function AboutPurpose({ mission, vision }: { mission: string; vision: string }) {
  const [missionIcon, visionIcon] = purpose.statementIcons;

  return (
    // `overflow-x-clip` (no `hidden`) para que las tarjetas puedan quedarse fijas.
    <section aria-labelledby="proposito-title" className="relative isolate overflow-x-clip bg-charcoal px-4 py-20 text-white sm:py-28">
      {/* Sol que gira detrás del título. */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 aspect-square w-[44rem] -translate-x-1/2 -translate-y-1/3 opacity-60">
        <div className={homeStyles.rays} />
        <div className={homeStyles.raysAccent} />
      </div>

      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em]">{purpose.eyebrow}</p>
          <h2 id="proposito-title" className="text-balance text-4xl sm:text-5xl lg:text-6xl">
            <RevealText text={purpose.title} />
          </h2>
          <p
            className={`${styles.stagger} mt-6 inline-flex flex-wrap items-center justify-center gap-3 text-xl text-white/85 sm:text-2xl`}
            style={{ "--i": 2 } as CSSProperties}
          >
            <Image src={purpose.items[1].icon} alt="" className={`${styles.spin} h-auto w-9`} />
            {purpose.lead}
          </p>
        </header>

        <PurposeStack items={purpose.items} />

        <div className={`${styles.grow} mt-16 sm:mt-24`}>
          <StatementSwitch
            items={[
              { label: "Misión", text: mission, icon: missionIcon },
              { label: "Visión", text: vision, icon: visionIcon },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
