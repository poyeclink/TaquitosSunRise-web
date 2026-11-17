import type { Metadata } from "next";
import { getRestaurantProfile } from "@/di/container";
import { AboutClosing } from "@/presentation/components/about/about-closing";
import { AboutCommunity } from "@/presentation/components/about/about-community";
import { AboutFacts } from "@/presentation/components/about/about-facts";
import { AboutFounders } from "@/presentation/components/about/about-founders";
import { AboutHero } from "@/presentation/components/about/about-hero";
import { AboutPurpose } from "@/presentation/components/about/about-purpose";
import { AboutTimeline } from "@/presentation/components/about/about-timeline";
import { KitchenGallery } from "@/presentation/components/about/kitchen-gallery";
import { ReadProgress } from "@/presentation/components/motion/read-progress";
import { ScrollBand } from "@/presentation/components/about/scroll-band";
import { SmoothScroll } from "@/presentation/components/motion/smooth-scroll";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Sunrise Taquitos: comida Tex-Mex hecha en familia desde 1988. Conoce nuestra historia, nuestra cocina y a la familia detrás de cada taquito.",
};

export default async function AboutPage() {
  const profile = await getRestaurantProfile.execute();

  return (
    <>
      <SmoothScroll />
      <ReadProgress />
      <AboutHero foundedYear={profile.foundedYear} />
      <AboutFacts foundedYear={profile.foundedYear} pillars={profile.pillars} />
      <AboutTimeline milestones={profile.milestones} />
      <AboutPurpose mission={profile.mission} vision={profile.vision} />
      <ScrollBand pillars={profile.pillars} />
      <KitchenGallery />
      <AboutCommunity />
      <AboutFounders story={profile.foundersStory} />
      <AboutClosing contact={profile.contact} />
    </>
  );
}
