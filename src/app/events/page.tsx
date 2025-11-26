import { Search } from "~/app/_components/search";
import { searchEvents } from "~/server/queries";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "~/_components/ui/card";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";

export const revalidate = 60; // Revalidate every 60 seconds

async function EventsGrid({ searchQuery }: { searchQuery?: string }) {
  const events = await searchEvents(searchQuery);

  return (
    <div className="grid w-full auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {events.map((event, index) => (
        <Card
          key={event.id}
          className="flex h-full flex-col gap-0 overflow-hidden p-0 transition-shadow duration-300 hover:shadow-lg"
        >
          <div className="flex flex-col p-6">
            <CardHeader className="p-0">
              <CardTitle>{event.name}</CardTitle>
              <CardDescription className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(event.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
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
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {event.location}
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
        </Card>
      ))}
    </div>
  );
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";

  return (
    <main className="p-4 md:p-6">
      <div className="mb-6 flex w-full flex-col gap-4 p-3 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold md:text-4xl">Events</h2>
          <p className="text-muted-foreground text-sm">
            Some upcoming events for members
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Search placeholder="Search events..." />
        </div>
      </div>
      <div className="px-3">
        <EventsGrid searchQuery={query} />
      </div>
    </main>
  );
}
