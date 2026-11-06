import { getRestaurantProfile } from "@/di/container";
import { SiteFooter } from "@/presentation/components/site-footer";
import { SiteHeader } from "@/presentation/components/site-header";

/** Layout del sitio público. El panel de administración tendrá su propio grupo, p. ej. `(admin)`. */
export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const profile = await getRestaurantProfile.execute();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter profile={profile} />
    </>
  );
}
