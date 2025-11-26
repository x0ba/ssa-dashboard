"use client";

import { useActionState } from "react";
import { Button } from "~/_components/ui/button";
import { deleteEvent } from "../_actions";

export function DeleteButton({ eventId }: { eventId: number }) {
  const [state, formAction, pending] = useActionState(deleteEvent, null);

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="eventId" value={eventId} />
      <Button
        type="submit"
        className="w-full bg-red-400 hover:bg-red-500"
        disabled={pending}
      >
        {pending ? "Deleting..." : "Delete"}
      </Button>
      {state?.error && (
        <div className="mt-2 text-xs text-red-600">{state.error}</div>
      )}
    </form>
  );
}
