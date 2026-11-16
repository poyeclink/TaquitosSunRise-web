"use client";

import { useTabs } from "@/presentation/components/home/use-tabs";

export interface PurposeItem {
  readonly label: string;
  readonly text: string;
}

/**
 * Misión, visión y porqué: se elige a la izquierda y se lee en grande a la derecha.
 *
 * Los tres textos ocupan la misma celda de la grilla, así la tarjeta toma la altura
 * del más largo y no cambia de tamaño al cambiar de pestaña. El texto activo entra
 * con un fundido; los demás quedan invisibles (fuera del árbol de accesibilidad),
 * pero siguen en el HTML para SEO.
 */
export function PurposeTabs({ items }: { items: readonly PurposeItem[] }) {
  const { active, tabProps, panelProps } = useTabs(items.length);

  return (
    <div className="grid gap-8 rounded-[2rem] bg-charcoal p-6 text-white shadow-[0_2.5rem_5rem_-2.5rem] shadow-charcoal sm:gap-10 sm:rounded-[2.5rem] sm:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:p-16">
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] sm:mb-6 sm:text-sm">Lo que nos mueve</p>
        <div
          role="tablist"
          aria-label="Lo que nos mueve"
          aria-orientation="vertical"
          className="flex flex-col items-start gap-1"
        >
          {items.map((item, index) => (
            <button
              key={item.label}
              {...tabProps(index)}
              className={`flex items-center whitespace-nowrap py-1 text-left text-2xl font-bold transition-opacity duration-300 sm:py-1.5 sm:text-4xl xl:text-5xl ${
                index === active ? "" : "opacity-45 hover:opacity-80"
              }`}
            >
              <span
                aria-hidden
                className={`h-1 shrink-0 rounded-full bg-aqua transition-[width,margin] duration-500 ease-out motion-reduce:transition-none ${
                  index === active ? "mr-3 w-7 sm:mr-4 sm:w-10" : "w-0"
                }`}
              />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span aria-hidden className="block h-12 select-none text-[6rem] font-bold leading-none text-aqua sm:h-16 sm:text-[8rem]">
          “
        </span>
        <div className="grid">
          {items.map((item, index) => {
            const on = index === active;
            return (
              <div
                key={item.label}
                {...panelProps(index)}
                hidden={undefined}
                className={`col-start-1 row-start-1 transition-[opacity,translate,visibility] duration-500 ease-out motion-reduce:transition-none ${
                  on ? "delay-100" : "invisible translate-y-3 opacity-0"
                }`}
              >
                <p className="text-pretty text-xl font-medium leading-snug sm:text-3xl sm:leading-snug">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
