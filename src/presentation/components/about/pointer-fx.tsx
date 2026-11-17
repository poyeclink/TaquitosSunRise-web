"use client";

import { useRef, type ElementType, type PointerEvent, type ReactNode } from "react";
import styles from "@/presentation/components/about/about.module.css";

/** Solo mouse: en táctil no hay cursor que seguir. */
const isMouse = (event: PointerEvent) => event.pointerType === "mouse";

/**
 * Tarjeta con inclinación 3D y un brillo que sigue al cursor.
 * El movimiento lo aplica el CSS (y lo apaga con `prefers-reduced-motion`).
 */
export function Tilt({
  as: Tag = "div",
  max = 7,
  className = "",
  style,
  children,
}: {
  as?: ElementType;
  max?: number;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  const onPointerMove = (event: PointerEvent) => {
    const el = ref.current;
    if (!el || !isMouse(event)) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--ry", `${((x - 0.5) * 2 * max).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-(y - 0.5) * 2 * max).toFixed(2)}deg`);
    el.style.setProperty("--px", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--py", `${(y * 100).toFixed(1)}%`);
  };

  const onPointerLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`${styles.tilt} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

/**
 * Área que publica la posición del cursor en `--mx` / `--my` (de -1 a 1).
 * Los hijos con la clase `parallax` del home se mueven según su `--depth`.
 */
export function PointerField({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onPointerMove = (event: PointerEvent) => {
    if (!isMouse(event)) return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", (((clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
      el.style.setProperty("--my", (((clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));
    });
  };

  const onPointerLeave = () => {
    ref.current?.style.setProperty("--mx", "0");
    ref.current?.style.setProperty("--my", "0");
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className={className}>
      {children}
    </div>
  );
}
