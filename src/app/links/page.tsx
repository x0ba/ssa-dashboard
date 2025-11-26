import { Search } from "~/app/_components/search";
import { TagFilter } from "~/app/_components/tag-filter";
import { searchLinks, getAllTags } from "~/server/queries";
import { Card, CardHeader, CardDescription } from "~/_components/ui/card";
import { Calendar, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export const revalidate = 60; // Revalidate every 60 seconds

async function LinksGrid({
  searchQuery,
  tag,
}: {
  searchQuery?: string;
  tag?: string;
}) {
  const links = await searchLinks(searchQuery, tag);

  if (links.length === 0) {
    return (
      <div className="text-muted-foreground py-12 text-center">
        No links found matching your filters.
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <Card
          key={link.id}
          className="py-0 transition-shadow duration-300 hover:shadow-lg"
        >
          <CardHeader className="flex flex-col gap-2 p-4">
            <div className="flex flex-row items-start gap-3">
              <LinkIcon className="h-10 w-10 rounded-lg bg-blue-100 p-2 text-blue-800" />
              <div className="flex flex-col gap-1">
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold transition-colors duration-300 hover:text-blue-800"
                >
                  {link.name}
                </Link>
                <span className="w-fit rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                  {link.tag}
                </span>
              </div>
            </div>
            <CardDescription className="text-muted-foreground mt-2 text-sm">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {(link.updatedAt ?? link.createdAt).toLocaleDateString(
                  "en-US",
                  { timeZone: "UTC" },
                )}
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export default async function LinksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";
  const tag = params.tag;

  const tags = await getAllTags();

  return (
    <main className="p-4 md:p-6">
      <div className="mb-6 flex w-full flex-col gap-4 p-3 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold md:text-4xl">Links</h2>
          <p className="text-muted-foreground text-sm">
            Some useful links for members
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Search placeholder="Search links..." />
        </div>
      </div>
      <div className="mb-6 px-3">
        <TagFilter tags={tags} />
      </div>
      <div className="px-3">
        <LinksGrid searchQuery={query} tag={tag} />
      </div>
    </main>
  );
}
