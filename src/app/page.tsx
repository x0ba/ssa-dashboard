import { Suspense } from "react";
import { RecentEventsSection } from "~/app/_components/sections/recent-events-section";
import { RecentLinksSection } from "~/app/_components/sections/recent-links-section";
import { Skeleton } from "~/app/_components/ui/skeleton";
import { WelcomeSection } from "~/app/_components/sections/welcome-section";
import { WelcomeCardSkeleton } from "~/app/_components/loading/welcome-card-skeleton";
import { Card } from "~/app/_components/ui/card";

// export const dynamic = "force-dynamic";

function EventsCardSkeleton() {
  return (
    <Card className="gap-2">
      <div className="p-6">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="flex flex-col gap-3 px-6 pb-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </Card>
  );
}

function LinksCardSkeleton() {
  return (
    <Card className="gap-2 sm:col-span-1 lg:col-span-2">
      <div className="p-6">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-4 px-6 pb-6 lg:grid-cols-2">
        <Skeleton className="h-32 w-full max-w-[320px]" />
        <Skeleton className="h-32 w-full max-w-[320px]" />
        <Skeleton className="h-32 w-full max-w-[320px]" />
        <Skeleton className="h-32 w-full max-w-[320px]" />
      </div>
    </Card>
  );
}

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold">Overview</h1>
      <Suspense fallback={<WelcomeCardSkeleton />}>
        <WelcomeSection />
      </Suspense>
      <div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<EventsCardSkeleton />}>
          <RecentEventsSection />
        </Suspense>
        <Suspense fallback={<LinksCardSkeleton />}>
          <RecentLinksSection />
        </Suspense>
      </div>
    </main>
  );
}
