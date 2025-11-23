import { Search } from "~/app/_components/search";
import { LinksGrid } from "~/app/_components/sections/admin-links-grid";

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
      <LinksGrid searchQuery={query} />
    </main>
  );
}
