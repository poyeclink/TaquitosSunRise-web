"use client";

import { useEffect, useState } from "react";
import styles from "@/presentation/components/contact/contact.module.css";

/** Cada cuánto cambia la palabra. */
const INTERVAL = 2600;

/**
 * Palabra que cambia sola cada pocos segundos, con un subrayado que se dibuja.
 * Los lectores de pantalla reciben la lista completa una sola vez.
 * Con `prefers-reduced-motion` se queda en la primera palabra.
 */
export function RotatingWords({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % words.length), INTERVAL);
    return () => window.clearInterval(timer);
  }, [words.length]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className={styles.swap}>
        <span key={index} className={`${styles.swapIn} relative col-start-1 row-start-1 whitespace-nowrap font-bold`}>
          {words[index]}
          <span className={`${styles.swapUnderline} absolute inset-x-0 -bottom-1 h-1 rounded-full bg-white`} />
        </span>
      </span>
    </>
  );
}
