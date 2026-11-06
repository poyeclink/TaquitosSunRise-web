import Image from "next/image";
import Link from "next/link";
import seal from "@brand/logos/svg/sello-est-1988-blanco.svg";
import type { RestaurantProfile } from "@/core/domain/restaurant/restaurant";
import { TodoNote } from "@/presentation/components/todo-note";

export function SiteFooter({ profile }: { profile: RestaurantProfile }) {
  const { address, phone, hours } = profile.contact;
  const contact = [
    { label: "Dirección", value: address, todo: "dirección del cliente" },
    { label: "Teléfono", value: phone, todo: "teléfono del cliente" },
    { label: "Horario", value: hours, todo: "horario del cliente" },
  ];

  return (
    <footer className="bg-crimson text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-12">
        <div className="flex flex-col gap-4">
          <Image src={seal} alt={`${profile.name}, est. ${profile.foundedYear}`} className="h-auto w-44" />
          <p className="max-w-xs text-lg leading-snug text-white/90">{profile.tagline}</p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.25em]">Explora</h2>
          <ul className="grid gap-2 text-lg">
            <li>
              <Link href="/" className="hover:underline">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:underline">
                Menú
              </Link>
            </li>
            <li>
              <Link href="/#historia" className="hover:underline">
                Nuestra historia
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.25em]">Visítanos</h2>
          <dl className="grid gap-3">
            {contact.map(({ label, value, todo }) => (
              <div key={label}>
                <dt className="text-sm text-white/80">{label}</dt>
                <dd className="text-lg">{value ?? <TodoNote>{todo}</TodoNote>}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-white/20">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-white/80">
          {profile.name} · Est. {profile.foundedYear} · The homemade way.
        </p>
      </div>
    </footer>
  );
}
