import type { CSSProperties } from "react";
import styles from "@/presentation/components/about/about.module.css";

/**
 * Texto que sube palabra por palabra al entrar en pantalla (scroll-driven, sin JS).
 * Sin soporte o con movimiento reducido se ve normal.
 */
export function RevealText({ text }: { text: string }) {
  const words = text.split(" ");
  return words.map((word, index) => (
    <span key={`${word}-${index}`}>
      <span className={styles.word}>
        <span className={styles.wordInner} style={{ "--i": index } as CSSProperties}>
          {word}
        </span>
      </span>
      {index < words.length - 1 ? " " : null}
    </span>
  ));
}

/** Texto largo que se "entinta" palabra por palabra mientras se lee. */
export function InkText({ text }: { text: string }) {
  const words = text.split(" ");
  return words.map((word, index) => (
    <span key={`${word}-${index}`}>
      <span className={styles.ink}>{word}</span>
      {index < words.length - 1 ? " " : null}
    </span>
  ));
}
