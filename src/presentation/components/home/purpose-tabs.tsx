"use client";

import { useTabs } from "@/presentation/components/home/use-tabs";
import styles from "@/presentation/components/home/home.module.css";

export interface PurposeItem {
  readonly label: string;
  readonly text: string;
}

/** Misión, visión y porqué en un selector segmentado. */
export function PurposeTabs({ items }: { items: readonly PurposeItem[] }) {
  const { active, tabProps, panelProps } = useTabs(items.length);

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-[0_2rem_4rem_-2rem] shadow-charcoal/30 ring-1 ring-charcoal/10 sm:p-10">
      <div role="tablist" aria-label="Lo que nos mueve" className="mb-8 inline-flex w-full rounded-full bg-charcoal/[0.06] p-1.5 sm:w-auto">
        {items.map((item, index) => (
          <button
            key={item.label}
            {...tabProps(index)}
            className={`flex-1 whitespace-nowrap rounded-full px-4 py-2.5 text-base font-bold transition sm:flex-none sm:px-6 sm:text-lg ${
              index === active ? "bg-crimson text-white shadow-md shadow-crimson/30" : "text-charcoal hover:bg-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div key={item.label} {...panelProps(index)} className={`${styles.panelEnter} relative`}>
          <span aria-hidden className="absolute -left-1 -top-6 select-none text-8xl font-bold leading-none text-crimson/15">
            “
          </span>
          <p className="relative text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
