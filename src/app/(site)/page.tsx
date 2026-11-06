import Image from "next/image";
import Link from "next/link";
import goodTaquitosGoodDays from "@brand/frases/frase-good-taquitos-good-days-full-color.svg";
import { getRestaurantProfile } from "@/di/container";

export default async function HomePage() {
  const profile = await getRestaurantProfile.execute();

  return (
    <>
      <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-16 text-center">
        <h1>
          <Image
            src={goodTaquitosGoodDays}
            alt="Good taquitos, good days"
            className="h-auto w-72 sm:w-96"
            preload
          />
        </h1>
        <p className="text-xl">Comida Tex-Mex hecha con cariño, en familia, desde {profile.foundedYear}.</p>
        <Link
          href="/menu"
          className="rounded-full bg-crimson px-8 py-3 text-lg font-bold text-white transition-opacity hover:opacity-90"
        >
          Ver el menú
        </Link>
      </section>

      <section aria-labelledby="nosotros" className="bg-charcoal text-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-2">
          <h2 id="nosotros" className="md:col-span-2">
            {profile.pillars.join(" › ")}
          </h2>
          <article>
            <h3 className="mb-2 text-2xl font-bold">Misión</h3>
            <p>{profile.mission}</p>
          </article>
          <article>
            <h3 className="mb-2 text-2xl font-bold">Visión</h3>
            <p>{profile.vision}</p>
          </article>
        </div>
      </section>
    </>
  );
}
