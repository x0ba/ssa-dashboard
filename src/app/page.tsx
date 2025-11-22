import { Card, CardContent } from "~/app/_components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { Music } from "lucide-react";
import { Suspense } from "react";
import { RecentEventsSection } from "~/app/_components/sections/recent-events-section";
import { RecentLinksSection } from "~/app/_components/sections/recent-links-section";
import { Skeleton } from "~/app/_components/ui/skeleton";

export const dynamic = "force-dynamic";

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

export default async function HomePage() {
  const user = await currentUser();
  const userName = user?.fullName;
  const currentDate = new Date().toLocaleDateString();

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold">Overview</h1>
      <Card className="from-primary/10 via-primary/5 to-background border-primary/20 mt-4 bg-linear-to-r">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-10">
          <div className="space-y-2">
            <h2 className="text-primary flex items-center gap-2.5 text-3xl font-bold tracking-tight sm:text-4xl">
              <Music width={36} height={36} /> Welcome to SSA,{" "}
              {userName?.substring(0, userName.indexOf(" ")) ?? " "}
              {"."}
            </h2>
            <p className="text-muted-foreground text-lg font-medium">
              {currentDate}
            </p>
          </div>
        </CardContent>
      </Card>
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
