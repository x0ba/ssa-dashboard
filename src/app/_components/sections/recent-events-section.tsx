import { Card, CardContent, CardHeader } from "../ui/card";
import { getRecentEvents } from "~/server/queries";
import Link from "next/link";
import { Calendar, Clock, ExternalLink, MapPin } from "lucide-react";

export async function RecentEventsSection() {
  const events = await getRecentEvents(3);

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
