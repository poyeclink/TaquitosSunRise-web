"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú" },
] as const;

/** Navegación principal; marca la página actual con `aria-current`. */
export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Principal">
      <ul className="flex items-center gap-1 text-lg font-medium sm:gap-2">
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
    </nav>
  );
}
