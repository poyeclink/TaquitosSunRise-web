import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // TODO: definir `metadataBase` cuando se confirme el dominio (docs/brand/05-pendientes.md).
  title: {
    default: "Sunrise Taquitos · The homemade way",
    template: "%s · Sunrise Taquitos",
  },
  description:
    "Good taquitos, good days. Comida Tex-Mex hecha con cariño, en familia, desde 1988.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // TODO: idioma del sitio pendiente (EN / ES / bilingüe). Ver docs/brand/05-pendientes.md.
    <html lang="es" className={`${leagueSpartan.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
