import Image from "next/image";
import Link from "next/link";
import logo from "@brand/logos/svg/logo-principal-full-color.svg";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b-4 border-crimson">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-4 py-3">
        <Link href="/" aria-label="Sunrise Taquitos, inicio">
          {/* w-20 = 80 px: por encima del mínimo de 75.6 px del logo */}
          <Image src={logo} alt="" className="h-auto w-20" preload />
        </Link>
        <nav aria-label="Principal">
          <ul className="flex gap-6 text-lg font-medium">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:text-crimson">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
