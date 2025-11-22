import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { getRecentLinks } from "~/server/queries";
import Link from "next/link";
import { Calendar, ExternalLink, Link as LinkIcon } from "lucide-react";

export async function RecentLinksSection() {
  const links = await getRecentLinks(4);

  return (
    <Card className="gap-2 sm:col-span-1 lg:col-span-2">
      <CardHeader>
        <span className="text-2xl font-bold">Recent Links</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {links.length === 0 ? (
          <span className="text-muted-foreground mb-2">No linkies :(</span>
        ) : (
          <div className="grid grid-cols-1 justify-items-center gap-4 lg:grid-cols-2">
            {links.map((link) => (
              <Card
                key={link.id}
                className="w-full max-w-[320px] py-0 transition-shadow duration-300 hover:shadow-lg"
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
                  <CardDescription className="text-muted-foreground text-sm">
                    {link.updatedAt?.toLocaleDateString() ??
                      link.createdAt.toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
