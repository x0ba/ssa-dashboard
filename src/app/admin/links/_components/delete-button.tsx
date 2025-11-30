"use client";

import { useActionState } from "react";
import { Button } from "~/_components/ui/button";
import { deleteLink } from "../_actions";

export function DeleteButton({ linkId }: { linkId: number }) {
  const [state, formAction, pending] = useActionState(deleteLink, null);

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="linkId" value={linkId} />
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
