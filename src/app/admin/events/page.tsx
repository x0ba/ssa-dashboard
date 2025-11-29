import { Search } from "~/app/_components/search";
import { searchAllEvents } from "~/server/queries";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "~/_components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { EditSheet } from "./_components/edit-sheet";
import { AddSheet } from "./_components/add-sheet";
import { DeleteButton } from "./_components/delete-button";
import { Button } from "~/_components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function EventsGrid({ searchQuery }: { searchQuery?: string }) {
  const events = await searchAllEvents(searchQuery);

  return (
    <div className="grid w-full auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {events.map((event, index) => (
        <Card
          key={event.id}
          className="flex h-full flex-col gap-0 overflow-hidden p-0 transition-shadow duration-300 hover:shadow-lg"
        >
          <div className="flex flex-col p-6">
            <CardHeader className="p-0">
              <CardTitle className="truncate">{event.name}</CardTitle>
              <CardDescription className="flex flex-col gap-2">
                <div className="flex min-w-0 items-center gap-1">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </span>
                </div>
                <div className="flex min-w-0 items-center gap-1">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {(() => {
                      const date = new Date(event.date);
                      const formatTime = (d: Date) => {
                        const hours = d.getUTCHours();
                        const minutes = d.getUTCMinutes();
                        const hour12 = hours % 12 || 12;
                        const ampm = hours >= 12 ? "PM" : "AM";
                        const minutesStr = minutes.toString().padStart(2, "0");
                        return `${hour12}:${minutesStr} ${ampm}`;
                      };
                      const start = formatTime(date);
                      if (event.endDate) {
                        const endDate = new Date(event.endDate);
                        const end = formatTime(endDate);
                        return `${start} - ${end}`;
                      }
                      return start;
                    })()}
                  </span>
                </div>
                <div className="flex min-w-0 items-center gap-1">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
              </CardDescription>
            </CardHeader>
          </div>
          {event.imageUrl && (
            <div className="relative aspect-4/5 w-full flex-1">
              <Image
                src={event.imageUrl}
                alt={event.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={index < 4}
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col gap-2 p-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <EditSheet event={event} />
              </div>
              <DeleteButton eventId={event.id} />
            </div>
            {/* <Button asChild variant="outline" className="w-full">
              <Link href={`/admin/events/${event.id}/rsvps`}>View RSVPs</Link>
            </Button> */}
          </div>
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
            Add, edit, and manage org events
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
        <EventsGrid searchQuery={query} />
      </div>
    </main>
  );
}
