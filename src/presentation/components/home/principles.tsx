"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { principles } from "@/presentation/components/home/home-content";
import styles from "@/presentation/components/home/home.module.css";

const { items } = principles;
const STEP = 360 / items.length;
const pad = (value: number) => String(value).padStart(2, "0");

/** Posición de cada lugar alrededor de la mesa (el primero, arriba). */
const SEATS = items.map((_, index) => {
  const angle = ((index * STEP - 90) * Math.PI) / 180;
  return { left: `${(50 + 50 * Math.cos(angle)).toFixed(2)}%`, top: `${(50 + 50 * Math.sin(angle)).toFixed(2)}%` };
});

/**
 * "Seis principios, una misma mesa": la lista elige el principio y la mesa gira
 * para traer su lugar al frente. La mesa es decorativa; la lista es el control accesible.
 */
export function Principles() {
  // `turns` acumula los pasos girados para que la mesa siempre tome el camino más corto.
  const [{ active, turns }, setState] = useState({ active: 0, turns: 0 });
  const baseId = useId();

  const select = (index: number) =>
    setState((prev) => {
      if (index === prev.active) return prev;
      const half = items.length / 2;
      const delta = ((((index - prev.active) % items.length) + items.length + half) % items.length) - half;
      return { active: index, turns: prev.turns + delta };
    });

  const angle = -turns * STEP;

  return (
    <section aria-labelledby="principios-title" className="relative isolate overflow-hidden bg-crimson px-4 py-20 text-white sm:py-28">
      <Image src={principles.texture} alt="" fill sizes="100vw" className="-z-10 object-cover" />

      <div className="mx-auto grid max-w-6xl gap-x-20 gap-y-10 lg:grid-cols-[1fr_1.05fr] lg:grid-rows-[auto_1fr]">
        <header className={`${styles.reveal} lg:col-start-1`}>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em]">{principles.eyebrow}</p>
          <h2 id="principios-title" className="text-balance text-4xl sm:text-5xl">
            {principles.title}
          </h2>
        </header>

        {/* La mesa */}
        <div aria-hidden className={`${styles.reveal} self-center px-8 py-6 lg:col-start-2 lg:row-span-2 lg:row-start-1`}>
          <div className="relative mx-auto aspect-square w-full max-w-[17rem] sm:max-w-sm lg:max-w-md">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/45" />

            <div className="absolute inset-[15%] grid place-items-center rounded-full bg-white shadow-[0_2rem_4rem_-1rem] shadow-charcoal/60 ring-[0.75rem] ring-white/20">
              {items.map((item, index) => (
                <Image
                  key={item.title}
                  src={item.icon}
                  alt=""
                  className={`col-start-1 row-start-1 h-auto w-[46%] transition-[opacity,scale,rotate] duration-700 ease-out motion-reduce:transition-none ${
                    index === active ? "" : "-rotate-45 scale-50 opacity-0"
                  }`}
                />
              ))}
              <span className="absolute bottom-[13%] text-xs font-bold tabular-nums tracking-[0.25em] text-crimson sm:text-sm">
                {pad(active + 1)} / {pad(items.length)}
              </span>
            </div>

            <div
              className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.34,1.2,0.64,1)] motion-reduce:transition-none"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              {items.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  tabIndex={-1}
                  onClick={() => select(index)}
                  className="absolute size-12 -translate-x-1/2 -translate-y-1/2 sm:size-16"
                  style={SEATS[index]}
                >
                  <span
                    className={`grid size-full place-items-center rounded-full bg-white shadow-lg shadow-charcoal/40 transition-[transform,scale,box-shadow] duration-[900ms] ease-[cubic-bezier(0.34,1.2,0.64,1)] motion-reduce:transition-none ${
                      index === active ? "scale-125 ring-4 ring-white/40" : "scale-90"
                    }`}
                    style={{ transform: `rotate(${-angle}deg)` }}
                  >
                    <Image src={item.icon} alt="" className="h-auto w-3/5" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* La lista: un principio abierto a la vez */}
        <ol className={`${styles.reveal} border-t border-white/30 lg:col-start-1 lg:self-start`}>
          {items.map((item, index) => {
            const open = index === active;
            return (
              <li key={item.title} className="border-b border-white/30">
                <h3>
                  <button
                    type="button"
                    id={`${baseId}-tab-${index}`}
                    aria-expanded={open}
                    aria-controls={`${baseId}-panel-${index}`}
                    onClick={() => select(index)}
                    onFocus={() => select(index)}
                    onPointerEnter={(event) => event.pointerType === "mouse" && select(index)}
                    className="flex w-full items-baseline gap-4 py-4 text-left focus-visible:outline-white"
                  >
                    <span className="w-7 text-sm font-bold tabular-nums tracking-[0.2em]">{pad(index + 1)}</span>
                    <span
                      className={`text-2xl font-bold transition-[translate,opacity] duration-300 sm:text-3xl ${
                        open ? "translate-x-1" : "opacity-75"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      aria-hidden
                      className={`ml-auto h-0.5 self-center rounded-full bg-white transition-[width] duration-500 ${open ? "w-10" : "w-0"}`}
                    />
                  </button>
                </h3>
                <div
                  id={`${baseId}-panel-${index}`}
                  role="region"
                  aria-labelledby={`${baseId}-tab-${index}`}
                  inert={!open}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="max-w-md pb-5 pl-11 text-lg leading-relaxed sm:text-xl">{item.text}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
