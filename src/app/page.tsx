import { RecentEventsSection } from "~/app/_components/sections/recent-events-section";
import { RecentLinksSection } from "~/app/_components/sections/recent-links-section";
import { WelcomeSection } from "~/app/_components/sections/welcome-section";

// export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold">Overview</h1>
      <WelcomeSection />
      <div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <RecentEventsSection />
        <RecentLinksSection />
      </div>
    </main>
  );
}
