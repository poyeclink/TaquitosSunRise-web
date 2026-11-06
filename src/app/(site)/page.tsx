import { getRestaurantProfile } from "@/di/container";
import { ClosingCta } from "@/presentation/components/home/closing-cta";
import { DayRitual } from "@/presentation/components/home/day-ritual";
import { Hero } from "@/presentation/components/home/hero";
import { PersonalityMarquee } from "@/presentation/components/home/personality-marquee";
import { Pillars } from "@/presentation/components/home/pillars";
import { Principles } from "@/presentation/components/home/principles";
import { Story } from "@/presentation/components/home/story";

export default async function HomePage() {
  const profile = await getRestaurantProfile.execute();

  return (
    <>
      <Hero />
      <PersonalityMarquee />
      <DayRitual />
      <Pillars names={profile.pillars} />
      <Story mission={profile.mission} vision={profile.vision} />
      <Principles />
      <ClosingCta />
    </>
  );
}
