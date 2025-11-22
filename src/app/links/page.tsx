import { db } from "~/server/db";
import { Search } from "~/app/_components/search";
import { Card, CardHeader, CardDescription } from "~/app/_components/ui/card";

import { Calendar, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function LinksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";

  const links = await db.query.links.findMany({
    where: (links, { ilike }) =>
      query ? ilike(links.name, `%${query}%`) : undefined,
    orderBy: (model, { desc }) => desc(model.updatedAt),
  });

  return (
    <main className="p-4">
      <div className="flex w-full items-start justify-between p-3 pb-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold">Links</h2>
          <p className="text-muted-foreground text-sm">
            Some useful links for members
          </p>
        </div>
        <span className="w-1/2">
          <Search placeholder="Search links..." />
        </span>
      </div>
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
                  {link.updatedAt?.toLocaleDateString() ??
                    link.createdAt.toLocaleDateString()}
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </main>
  );
}
