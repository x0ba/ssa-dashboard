import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/_components/ui/card";
import type { User } from "@clerk/nextjs/server";
import {
  Calendar,
  Clock,
  ExternalLink,
  Link as LinkIcon,
  MapPin,
  Music,
} from "lucide-react";
import Link from "next/link";
import { getHomepageData } from "~/server/queries";
import { UserInfoSection } from "~/app/_components/user-info-section";
import type { InferSelectModel } from "drizzle-orm";
import type { events as eventsTable, links as linksTable } from "~/server/db/schema";
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

type Event = InferSelectModel<typeof eventsTable>;
type LinkType = InferSelectModel<typeof linksTable>;

function WelcomeSection({ user }: { user: User | null }) {
  const userName = user?.fullName;
  const currentDate = new Date().toLocaleDateString();

  return (
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
  );
}

function RecentEventsSection({ events }: { events: Event[] }) {
  return (
    <Card className="gap-2">
      <CardHeader>
        <span className="text-2xl font-bold">Upcoming Events</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {events.length === 0 ? (
          <span className="text-muted-foreground mb-2">
            No upcoming events :(
          </span>
        ) : (
          events.map((event) => (
            <div key={event.id} className="mb-2 flex flex-col gap-1">
              <span className="font-medium">{event.name}</span>
              <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <Calendar className="h-4 w-4" />
                {new Date(event.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <Clock className="h-4 w-4" />
                {(() => {
                  const date = new Date(event.date);
                  const hours = date.getUTCHours();
                  const minutes = date.getUTCMinutes();
                  const hour12 = hours % 12 || 12;
                  const ampm = hours >= 12 ? "PM" : "AM";
                  const minutesStr = minutes.toString().padStart(2, "0");
                  return `${hour12}:${minutesStr} ${ampm}`;
                })()}
              </div>
              <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <MapPin className="h-4 w-4" />
                {event.location}
              </div>
            </div>
          ))
        )}
        <Link
          href="/events"
          className="text-muted-foreground flex items-center gap-1.5 text-sm hover:underline"
        >
          <ExternalLink width={16} height={16} /> See all
        </Link>
      </CardContent>
    </Card>
  );
}

function RecentLinksSection({ links }: { links: LinkType[] }) {
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

export default async function HomePage() {
  const [user, { events, links }] = await Promise.all([
    currentUser(),
    getHomepageData(),
  ]);

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold">Overview</h1>
      <WelcomeSection user={user} />
      <div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <RecentEventsSection events={events} />
        <RecentLinksSection links={links} />
        <Card className="gap-2 sm:col-span-1 lg:col-span-2">
          <CardHeader>
            <span className="text-2xl font-bold">
              idk wtf to put here yet its just a placeholder
            </span>
          </CardHeader>
        </Card>
        <UserInfoSection user={user} />
      </div>
    </main>
  );
}
