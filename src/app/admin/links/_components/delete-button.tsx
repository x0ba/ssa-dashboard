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
