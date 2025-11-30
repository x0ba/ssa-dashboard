import { getEventRsvps, getEventById } from "~/server/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "~/_components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/_components/ui/table";

export default async function EventRsvpsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventId = parseInt(id);

  if (isNaN(eventId)) notFound();

  // Fetch event details and RSVPs in parallel
  const [event, rsvps] = await Promise.all([
    getEventById(eventId),
    getEventRsvps(eventId),
  ]);

  if (!event) notFound();

  return (
    <main className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/events">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">RSVPs: {event.name}</h1>
          <p className="text-muted-foreground">
            {rsvps.length} total registered guests
          </p>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Registered At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rsvps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No RSVPs yet.
                </TableCell>
              </TableRow>
            ) : (
              rsvps.map((rsvp) => (
                <TableRow key={rsvp.id}>
                  <TableCell className="font-medium">{rsvp.name}</TableCell>
                  <TableCell>{rsvp.email}</TableCell>
                  <TableCell>
                    {new Date(rsvp.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
