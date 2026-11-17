import styles from "@/presentation/components/about/about.module.css";

/** Barra fina arriba de la pantalla que se llena con el scroll de la página (solo CSS). */
export function ReadProgress() {
  return <div aria-hidden className={`${styles.readProgress} fixed inset-x-0 top-0 z-[60] h-1 bg-aqua`} />;
}
