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
        <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
          {state.error}
        </div>
      )}
    </form>
  );
}
