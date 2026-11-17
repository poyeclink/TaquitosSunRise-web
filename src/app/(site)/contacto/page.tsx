import type { Metadata } from "next";
import { getRestaurantProfile } from "@/di/container";
import { CateringBand } from "@/presentation/components/contact/catering-band";
import { ContactHero } from "@/presentation/components/contact/contact-hero";
import { ContactLocation } from "@/presentation/components/contact/contact-location";
import { ContactSection } from "@/presentation/components/contact/contact-section";
import { ReadProgress } from "@/presentation/components/motion/read-progress";
import { SmoothScroll } from "@/presentation/components/motion/smooth-scroll";
import { submitContact } from "./actions";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos, llámanos o visítanos. Preguntas, comentarios y catering de Sunrise Taquitos: comida Tex-Mex hecha en familia desde 1988.",
};

export default async function ContactPage() {
  const profile = await getRestaurantProfile.execute();

  return (
    <>
      <SmoothScroll />
      <ReadProgress />
      <ContactHero contact={profile.contact} />
      <ContactSection action={submitContact} contact={profile.contact} />
      <CateringBand />
      <ContactLocation contact={profile.contact} />
    </>
  );
}
