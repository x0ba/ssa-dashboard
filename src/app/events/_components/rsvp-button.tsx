"use client";
import { Button } from "~/_components/ui/button";
import { useActionState } from "react";
import { rsvpToEvent, cancelRsvp } from "../_actions";

export default function RsvpButton({
  eventId,
  isRsvpd = false,
}: {
  eventId: number;
  isRsvpd?: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    isRsvpd ? cancelRsvp : rsvpToEvent,
    null,
  );

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="eventId" value={eventId} />
      <Button
        type="submit"
        className="w-full"
        disabled={pending}
        variant={isRsvpd ? "outline" : "default"}
      >
        {pending ? "Cogitating..." : isRsvpd ? "Cancel RSVP" : "RSVP"}
      </Button>
      {state?.error && (
        <div className="bg-destructive/15 text-destructive dark:bg-destructive/20 mt-4 rounded-md p-3 text-sm">
          {state.error}
        </div>
      )}
    </form>
  );
}
