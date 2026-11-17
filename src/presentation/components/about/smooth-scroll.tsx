"use client";

import { useEffect } from "react";

/**
 * Scroll con inercia para rueda de mouse (sin dependencias).
 *
 * La rueda avanza a saltos de ~100 px; aquí cada giro mueve un "objetivo" y la página
 * lo alcanza con una curva suave. Como el scroll sigue siendo el nativo, las animaciones
 * scroll-driven, `position: sticky` y los lectores de pantalla funcionan igual.
 *
 * No se activa con `prefers-reduced-motion`, ni en pantallas táctiles (su scroll ya es suave).
 * Teclado, barra de scroll y zoom (Ctrl + rueda) quedan nativos.
 */

/** Qué tan rápido alcanza al objetivo (más alto = más rápido). */
const STIFFNESS = 9;

let controller: { scrollTo: (top: number) => void } | null = null;

/** Lleva la página a `top` con la misma inercia (o con scroll suave nativo si no está activa). */
export function smoothScrollTo(top: number) {
  if (controller) controller.scrollTo(top);
  else window.scrollTo({ top, behavior: "smooth" });
}

/** ¿El evento ocurre dentro de algo que se desplaza en vertical por su cuenta? */
function insideScroller(target: EventTarget | null, deltaY: number) {
  for (let el = target as HTMLElement | null; el && el !== document.body; el = el.parentElement) {
    const { overflowY } = getComputedStyle(el);
    if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) return true;
    }
  }
  return false;
}

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !mouse) return;

    const root = document.documentElement;
    const maxScroll = () => root.scrollHeight - window.innerHeight;
    const clamp = (value: number) => Math.min(maxScroll(), Math.max(0, value));

    let target = window.scrollY;
    let current = window.scrollY;
    let running = false;
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      // Interpolación independiente de los FPS: misma sensación a 60 o 144 Hz.
      const dt = Math.min(0.05, (now - last) / 1000 || 1 / 60);
      last = now;
      current += (target - current) * (1 - Math.exp(-STIFFNESS * dt));
      if (Math.abs(target - current) < 0.4) {
        current = target;
        running = false;
      }
      window.scrollTo(0, current);
      if (running) frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.defaultPrevented) return; // zoom
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return; // gesto horizontal (carrusel)
      if (insideScroller(event.target, event.deltaY)) return;
      event.preventDefault();
      if (!running) current = target = window.scrollY;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      target = clamp(target + event.deltaY * unit);
      start();
    };

    // Teclado, barra o anclas nativas: la inercia se sincroniza con la posición real.
    const onScroll = () => {
      if (!running) current = target = window.scrollY;
    };

    // Enlaces internos (#camino): mismo deslizamiento, respetando el header fijo.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      const section = id ? document.getElementById(id) : null;
      if (!section || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      event.preventDefault();
      const offset = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
      controller?.scrollTo(section.getBoundingClientRect().top + window.scrollY - offset);
      history.pushState(null, "", `#${id}`);
    };

    controller = {
      scrollTo: (top) => {
        current = window.scrollY;
        target = clamp(top);
        start();
      },
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", stop);
    window.addEventListener("pointerdown", stop);
    document.addEventListener("click", onClick);
    return () => {
      stop();
      controller = null;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("pointerdown", stop);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
