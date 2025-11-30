"use client";

import { useActionState } from "react";
import { Button } from "~/_components/ui/button";
import { deleteEvent } from "../_actions";

export function DeleteButton({ eventId }: { eventId: number }) {
  const [state, formAction, pending] = useActionState(deleteEvent, null);

  return (
    <form action={formAction} className="flex-1">
      <input type="hidden" name="eventId" value={eventId} />
      <Button
        type="submit"
        className="w-full"
        variant="destructive"
        disabled={pending}
      >
        {pending ? "Deleting..." : "Delete"}
      </Button>
      {state?.error && (
        <div className="text-destructive mt-2 text-xs">{state.error}</div>
      )}
    </form>
  );
}
