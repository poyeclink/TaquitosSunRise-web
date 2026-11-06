import Image from "next/image";
import Link from "next/link";
import logo from "@brand/logos/svg/logo-principal-full-color.svg";
import { SiteNav } from "@/presentation/components/site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-crimson bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-2">
        <Link href="/" aria-label="Sunrise Taquitos, inicio">
          {/* w-[4.75rem] = 76 px: por encima del mínimo de 75.6 px del logo */}
          <Image src={logo} alt="" className="h-auto w-[4.75rem]" preload />
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
