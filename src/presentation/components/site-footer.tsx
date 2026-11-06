import Image from "next/image";
import seal from "@brand/logos/svg/sello-est-1988-blanco.svg";
import type { RestaurantProfile } from "@/core/domain/restaurant/restaurant";
import { TodoNote } from "@/presentation/components/todo-note";

export function SiteFooter({ profile }: { profile: RestaurantProfile }) {
  const { address, phone, hours } = profile.contact;

  return (
    <footer className="bg-crimson text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <Image src={seal} alt={`${profile.name}, est. ${profile.foundedYear}`} className="h-auto w-40" />
        <dl className="grid gap-2">
          <div>
            <dt className="sr-only">Dirección</dt>
            <dd>{address ?? <TodoNote>dirección del cliente</TodoNote>}</dd>
          </div>
          <div>
            <dt className="sr-only">Teléfono</dt>
            <dd>{phone ?? <TodoNote>teléfono del cliente</TodoNote>}</dd>
          </div>
          <div>
            <dt className="sr-only">Horario</dt>
            <dd>{hours ?? <TodoNote>horario del cliente</TodoNote>}</dd>
          </div>
        </dl>
      </div>
    </footer>
  );
}
