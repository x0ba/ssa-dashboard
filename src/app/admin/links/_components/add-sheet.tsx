"use client";

import { useActionState } from "react";
import { Button } from "~/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/_components/ui/sheet";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/_components/ui/field";
import { Input } from "~/_components/ui/input";
import { createLink } from "../_actions";

export function AddSheet() {
  const [state, formAction, pending] = useActionState(createLink, null);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Create Link</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Create Link</SheetTitle>
          <SheetDescription>
            Create a new link for members to view.
          </SheetDescription>
        </SheetHeader>
        <form action={formAction} className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <FieldDescription>The name of the link.</FieldDescription>
                <Input id="name" name="name" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="url">URL</FieldLabel>
                <FieldDescription>
                  The destination URL of the link. Include the https:// at the
                  beginning.
                </FieldDescription>
                <Input id="url" name="url" type="url" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="tag">Tag</FieldLabel>
                <Input id="tag" name="tag" defaultValue="General" required />
              </Field>
            </FieldGroup>

            {state?.error && (
              <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
                {state.error}
              </div>
            )}
          </div>
          <SheetFooter>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Creating..." : "Submit"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
