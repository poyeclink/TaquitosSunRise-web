import Image from "next/image";
import { principles } from "@/presentation/components/home/home-content";
import styles from "@/presentation/components/home/home.module.css";

export function Principles() {
  return (
    <section aria-labelledby="principios-title" className="bg-crimson/[0.05] px-4 py-20 sm:py-28">
      <header className={`${styles.reveal} mx-auto mb-12 max-w-2xl text-center sm:mb-16`}>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-crimson">{principles.eyebrow}</p>
        <h2 id="principios-title" className="text-balance text-4xl sm:text-5xl">
          {principles.title}
        </h2>
      </header>

      <ul className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {principles.items.map((item, index) => (
          <li
            key={item.title}
            className={`${styles.reveal} ${styles.wiggleOnHover} group flex gap-5 rounded-3xl border-2 border-transparent bg-white p-6 transition duration-300 hover:border-crimson hover:shadow-lg sm:p-8`}
          >
            <span
              className={`${styles.wiggle} grid size-16 shrink-0 place-items-center rounded-2xl bg-crimson/[0.08] transition-colors group-hover:bg-white`}
            >
              <Image src={item.icon} alt="" className="h-auto w-10" />
            </span>
            <div>
              <span className="text-sm font-bold tracking-[0.25em] text-crimson">0{index + 1}</span>
              <h3 className="mb-1 text-xl font-bold sm:text-2xl">{item.title}</h3>
              <p className="text-lg leading-snug text-charcoal/80">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
