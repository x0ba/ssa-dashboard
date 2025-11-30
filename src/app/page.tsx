import { Card, CardContent, CardHeader } from "~/_components/ui/card";
import type { User } from "@clerk/nextjs/server";
import { Calendar, Clock, ExternalLink, MapPin, Music } from "lucide-react";
import Link from "next/link";
import { getHomepageData, getUserRsvps } from "~/server/queries";
import { UserInfoSection } from "~/app/_components/user-info-section";
import type { InferSelectModel } from "drizzle-orm";
import type { events as eventsTable } from "~/server/db/schema";
import { currentUser } from "@clerk/nextjs/server";

export const revalidate = 60; // Revalidate every 60 seconds

type Event = InferSelectModel<typeof eventsTable>;

function WelcomeSection({ user }: { user: User | null }) {
  const userName = user?.fullName;
  const currentDate = new Date().toLocaleDateString("en-US", {
    timeZone: "UTC",
  });

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
    <Card className="col-span-full gap-2">
      <CardHeader>
        <span className="text-2xl font-bold">Upcoming Events</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {events.length === 0 ? (
          <span className="text-muted-foreground mb-2">
            No upcoming events :(
          </span>
        ) : (
          <>
            <div className="flex flex-row gap-4 overflow-x-auto pb-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex min-w-[250px] flex-col gap-1 rounded-lg border p-3"
                >
                  <span className="font-medium">{event.name}</span>
                  <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                    <Calendar className="h-4 w-4" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeZone: "UTC",
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
              ))}
            </div>
            <Link
              href="/events"
              className="text-muted-foreground flex items-center gap-1.5 text-sm hover:underline"
            >
              <ExternalLink width={16} height={16} /> See all
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function UserRsvpsSection({
  rsvps,
}: {
  rsvps: Awaited<ReturnType<typeof getUserRsvps>>;
}) {
  return (
    <Card className="flex flex-col gap-2 sm:col-span-1 lg:col-span-2">
      <CardHeader>
        <span className="text-2xl font-bold">Your RSVPs</span>
      </CardHeader>
      <CardContent className="flex flex-1 flex-row items-center gap-4 overflow-x-auto pb-4">
        {rsvps.length === 0 ? (
          <span className="text-muted-foreground mb-2">
            You haven&apos;t RSVP&apos;d to any events yet.
          </span>
        ) : (
          rsvps.map((rsvp) => (
            <div
              key={rsvp.id}
              className="flex min-w-[250px] flex-col gap-1 rounded-lg border p-3"
            >
              <span className="font-medium">{rsvp.event.name}</span>
              <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <Calendar className="h-4 w-4" />
                {new Date(rsvp.event.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </div>
              <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <Clock className="h-4 w-4" />
                {(() => {
                  const date = new Date(rsvp.event.date);
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
                {rsvp.event.location}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export default async function HomePage() {
  const user = await currentUser();
  const [{ events }, userRsvps] = await Promise.all([
    getHomepageData(),
    user
      ? getUserRsvps(user.emailAddresses[0]?.emailAddress ?? "")
      : Promise.resolve([]),
  ]);

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold">Overview</h1>
      <WelcomeSection user={user} />
      <div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <UserInfoSection user={user} />
        <UserRsvpsSection rsvps={userRsvps} />
        <RecentEventsSection events={events} />
      </div>
    </main>
  );
}
