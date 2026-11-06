import type { Metadata } from "next";
import { getPublicMenu } from "@/di/container";
import { MenuView } from "@/presentation/components/menu-view";

export const metadata: Metadata = {
  title: "Menú",
  description: "Desayunos y almuerzos Tex-Mex hechos en casa. Home of the breakfast taco.",
};

export default async function MenuPage() {
  const menu = await getPublicMenu.execute();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-10 text-crimson">Menú</h1>
      <MenuView menu={menu} />
    </div>
  );
}
