"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/menu", label: "Menú" },
  { href: "/contacto", label: "Contacto" },
] as const;

/**
 * Navegación principal; marca la página actual con `aria-current`.
 * Desde `md` va en línea; en móvil se abre un panel bajo el header.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav aria-label="Principal">
      {/* Escritorio */}
      <ul className="hidden items-center gap-2 text-lg font-medium md:flex">
        {NAV.map(({ href, label }) => {
          const current = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={current ? "page" : undefined}
                className={`rounded-full px-4 py-2 transition-colors ${
                  current ? "bg-crimson text-white" : "hover:bg-crimson/[0.08] hover:text-crimson"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Móvil: botón de tres líneas que se convierte en X. */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
        onClick={() => setOpen((value) => !value)}
        className="relative grid size-12 place-items-center rounded-full bg-crimson text-white shadow-lg shadow-crimson/30 md:hidden"
      >
        {[-6, 0, 6].map((y, index) => (
          <span
            key={y}
            aria-hidden
            className="absolute h-0.5 w-5 rounded-full bg-current transition-[translate,rotate,opacity] duration-300 motion-reduce:transition-none"
            style={{
              translate: `0 ${open ? 0 : y}px`,
              rotate: open ? (index === 0 ? "45deg" : index === 2 ? "-45deg" : "0deg") : "0deg",
              opacity: open && index === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      <div
        id={panelId}
        inert={!open}
        className={`absolute inset-x-0 top-full border-b-4 border-crimson bg-white shadow-[0_1.5rem_2rem_-1.5rem] shadow-charcoal/40 transition-[opacity,translate,visibility] duration-300 ease-out motion-reduce:transition-none md:hidden ${
          open ? "" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-2xl font-bold">
          {NAV.map(({ href, label }, index) => {
            const current = pathname === href;
            return (
              <li
                key={href}
                className="transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none"
                style={{
                  transitionDelay: open ? `${index * 50}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  translate: open ? "0 0" : "0 0.5rem",
                }}
              >
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={current ? "page" : undefined}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-colors ${
                    current ? "bg-crimson text-white" : "hover:bg-crimson/[0.08] hover:text-crimson"
                  }`}
                >
                  {label}
                  <span aria-hidden className="text-lg">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
