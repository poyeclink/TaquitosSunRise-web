"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import motion from "@/presentation/components/motion/motion.module.css";
import { useTabs } from "@/presentation/components/home/use-tabs";

export interface Statement {
  readonly label: string;
  readonly text: string;
  readonly icon: StaticImageData;
}

/** Tiempo que se muestra cada texto antes de pasar al siguiente. */
const INTERVAL = 8000;

/**
 * Misión y visión en un selector: el texto activo entra palabra por palabra.
 * Rota solo mientras está en pantalla; se detiene al pasar el cursor, con foco,
 * cuando la persona elige una pestaña o si prefiere menos movimiento.
 */
export function StatementSwitch({ items }: { items: readonly Statement[] }) {
  const { active, setActive, tabProps, panelProps } = useTabs(items.length);
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const running = visible && !paused && !stopped;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActive((active + 1) % items.length), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [running, active, items.length, setActive]);

  return (
    <div
      ref={root}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative isolate grid gap-8 overflow-hidden rounded-[2rem] bg-white/[0.06] p-6 ring-1 ring-white/15 sm:rounded-[2.5rem] sm:p-12 md:grid-cols-[auto_1fr] md:items-center md:gap-14"
    >
      {/* Ícono grande que gira al cambiar. */}
      <div aria-hidden className="relative mx-auto grid size-40 place-items-center sm:size-52">
        <span className="absolute inset-0 rounded-full border-2 border-dashed border-white/25" />
        <span
          className="absolute inset-3 rounded-full border-4 border-aqua/70 transition-transform duration-700"
          style={{ clipPath: "inset(0 50% 50% 0)", transform: `rotate(${active * 180}deg)` }}
        />
        <span className="grid size-[70%] place-items-center rounded-full bg-white shadow-2xl shadow-charcoal/60">
          {items.map((item, index) => (
            <Image
              key={item.label}
              src={item.icon}
              alt=""
              className={`col-start-1 row-start-1 h-auto w-1/2 transition-[opacity,scale,rotate] duration-700 ease-out motion-reduce:transition-none ${
                index === active ? "" : "-rotate-90 scale-50 opacity-0"
              }`}
            />
          ))}
        </span>
      </div>

      <div>
        <div
          role="tablist"
          aria-label="Misión y visión"
          className="relative mb-8 inline-grid rounded-full bg-white/10 p-1"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {/* Pastilla que se desliza bajo la pestaña activa. */}
          <span
            aria-hidden
            className="absolute inset-y-1 left-1 rounded-full bg-white shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `calc((100% - 0.5rem) / ${items.length})`, transform: `translateX(${active * 100}%)` }}
          />
          {items.map((item, index) => {
            const props = tabProps(index);
            return (
              <button
                key={item.label}
                {...props}
                onClick={() => {
                  setStopped(true);
                  props.onClick();
                }}
                className={`relative z-10 rounded-full px-6 py-2.5 text-base font-bold transition-colors duration-300 sm:px-8 sm:text-lg ${
                  index === active ? "text-charcoal" : "text-white hover:text-white/80"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1">
          {items.map((item, index) => {
            const on = index === active;
            const words = item.text.split(" ");
            return (
              <div
                key={item.label}
                {...panelProps(index)}
                hidden={undefined}
                className={`col-start-1 row-start-1 ${on ? "" : "invisible"}`}
              >
                {/* `key` cambia al activarse para que la entrada palabra por palabra se repita. */}
                <blockquote key={on ? "on" : "off"} className="text-pretty text-xl font-medium leading-snug sm:text-3xl sm:leading-snug">
                  {words.map((word, wordIndex) => (
                    <span key={wordIndex}>
                      <span className={on ? motion.wordIn : ""} style={{ "--i": wordIndex } as CSSProperties}>
                        {word}
                      </span>
                      {wordIndex < words.length - 1 ? " " : null}
                    </span>
                  ))}
                </blockquote>
              </div>
            );
          })}
        </div>

        {/* Avance de la rotación automática (desaparece cuando la persona toma el control). */}
        {!stopped && (
          <div aria-hidden className="mt-8 h-1 max-w-xs overflow-hidden rounded-full bg-white/15 motion-reduce:hidden">
            <span
              key={`${active}-${running}`}
              className={`block h-full origin-left rounded-full bg-aqua ${running ? motion.timer : "scale-x-0"}`}
              style={{ "--duration": `${INTERVAL}ms` } as CSSProperties}
            />
          </div>
        )}
      </div>
    </div>
  );
}
