import { Search } from "~/app/_components/search";
import { EventsGrid } from "~/app/_components/sections/events-grid";
import { EventsGridSkeleton } from "~/app/_components/loading/events-grid-skeleton";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";

  return (
    <main className="p-4">
      <div className="flex w-full items-start justify-between p-3 pb-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold">Events</h2>
          <p className="text-muted-foreground text-sm">
            Some upcoming events for members
          </p>
        </div>
        <span className="w-1/2">
          <Search placeholder="Search events..." />
        </span>
      </div>
      <Suspense key={query} fallback={<EventsGridSkeleton />}>
        <EventsGrid searchQuery={query} />
      </Suspense>
    </main>
  );
}
