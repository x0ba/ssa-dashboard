import { Search } from "~/app/_components/search";
import { searchEvents } from "~/server/queries";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "~/app/_components/ui/card";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";

  const events = await searchEvents(query);

  return (
    <main className="p-4">
      <div className="flex w-full items-start justify-between p-3 pb-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold">Events</h2>
          <p className="text-muted-foreground text-sm">
            Some upcoming events for members
          </p>
        </div>
        <span className="w-1/2">
          <Search placeholder="Search events..." />
        </span>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {events.map((event) => (
          <Card
            key={event.id}
            className="flex flex-col gap-0 overflow-hidden p-0 transition-shadow duration-300 hover:shadow-lg"
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
                    })}
                  </div>
                  <div className="flex items-center gap-1">
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
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                </CardDescription>
              </CardHeader>
            </div>
            <div className="relative h-64 w-full">
              <Image
                src={event.imageUrl}
                alt={event.name}
                fill
                className="object-cover"
              />
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
