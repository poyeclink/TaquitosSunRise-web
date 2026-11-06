"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

/**
 * Pestañas accesibles (patrón WAI-ARIA Tabs): flechas, Inicio y Fin mueven el foco
 * y activan la pestaña. Los paneles inactivos quedan en el DOM con `hidden` (SEO).
 */
export function useTabs(count: number, initial = 0) {
  const [active, setActive] = useState(initial);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const select = (index: number) => {
    const next = (index + count) % count;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: count - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      select(moves[event.key]);
    }
  };

  const tabProps = (index: number) => ({
    ref: (el: HTMLButtonElement | null) => {
      tabs.current[index] = el;
    },
    id: `${baseId}-tab-${index}`,
    role: "tab" as const,
    type: "button" as const,
    "aria-selected": index === active,
    "aria-controls": `${baseId}-panel-${index}`,
    tabIndex: index === active ? 0 : -1,
    onClick: () => setActive(index),
    onKeyDown,
  });

  const panelProps = (index: number) => ({
    id: `${baseId}-panel-${index}`,
    role: "tabpanel" as const,
    "aria-labelledby": `${baseId}-tab-${index}`,
    hidden: index !== active,
    tabIndex: 0,
  });

  return { active, tabProps, panelProps };
}
