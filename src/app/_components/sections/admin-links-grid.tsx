import { searchLinks } from "~/server/queries";
import { Card, CardHeader, CardDescription, CardAction } from "../ui/card";
import { Calendar, Link as LinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface LinksGridProps {
  searchQuery?: string;
}

export async function LinksGrid({ searchQuery }: LinksGridProps) {
  const links = await searchLinks(searchQuery);

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
                {link.updatedAt?.toLocaleDateString() ??
                  link.createdAt.toLocaleDateString()}
              </div>
            </CardDescription>
            <CardAction className="mt-2 flex w-full justify-center">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/admin/links/${link.id}`}>Edit</Link>
              </Button>
            </CardAction>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
