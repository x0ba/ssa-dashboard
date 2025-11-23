import { Search } from "~/app/_components/search";
import { LinksGrid } from "~/app/_components/sections/admin-links-grid";
import { Button } from "~/app/_components/ui/button";
import { LinksGridSkeleton } from "~/app/_components/loading/links-grid-skeleton";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function LinksAdminPage({
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
          <h2 className="text-4xl font-bold">Links</h2>
          <p className="text-muted-foreground text-sm">
            Add, edit, and manage links for members
          </p>
        </div>
        <span className="w-1/2">
          <Search placeholder="Search links..." />
        </span>
      </div>
      <Suspense key={query} fallback={<LinksGridSkeleton />}>
        <LinksGrid searchQuery={query} />
      </Suspense>
    </main>
  );
}
