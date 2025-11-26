import { Search } from "~/app/_components/search";
import { searchLinks } from "~/server/queries";
import {
  Card,
  CardHeader,
  CardDescription,
  CardAction,
} from "~/_components/ui/card";
import { Calendar, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { AddSheet } from "./_components/add-sheet";
import { EditSheet } from "./_components/edit-sheet";
import { DeleteButton } from "./_components/delete-button";

export const dynamic = "force-dynamic";

async function LinksGrid({ searchQuery }: { searchQuery?: string }) {
  const links = await searchLinks(searchQuery);

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <Card
          key={link.id}
          className="flex flex-col gap-0 overflow-hidden p-0 transition-shadow duration-300 hover:shadow-lg"
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
            <CardAction className="mt-2 flex w-full gap-2">
              <span className="flex-1">
                <EditSheet link={link} />
              </span>
              <span className="shrink-0">
                <DeleteButton linkId={link.id} />
              </span>
            </CardAction>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export default async function LinksAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";

  return (
    <main className="p-4 md:p-6">
      <div className="mb-6 flex w-full flex-col gap-4 p-3 md:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold md:text-4xl">Links</h2>
          <p className="text-muted-foreground text-sm">
            Add, edit, and manage links for members
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <Search placeholder="Search links..." />
          </div>
          <div className="shrink-0">
            <AddSheet />
          </div>
        </div>
      </div>
      <div className="px-3">
        <LinksGrid searchQuery={query} />
      </div>
    </main>
  );
}
