"use client";

import { useActionState, useState } from "react";
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
import { createEvent } from "../_actions";
import { UploadButton } from "~/utils/uploadthing";

export function AddSheet() {
  const [state, formAction, pending] = useActionState(createEvent, null);
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Create Event</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Create Event</SheetTitle>
          <SheetDescription>Create a new event.</SheetDescription>
        </SheetHeader>
        <form action={formAction} className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <FieldDescription>The name of the event.</FieldDescription>
                <Input id="name" name="name" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="location">Location</FieldLabel>
                <FieldDescription>
                  Where the event will take place.
                </FieldDescription>
                <Input id="location" name="location" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
                <FieldDescription>
                  Upload an image or paste a URL directly.
                </FieldDescription>
                <div className="flex flex-col gap-2">
                  <UploadButton
                    endpoint={"imageUploader"}
                    onClientUploadComplete={(res) => {
                      // Extract the URL from the response
                      const url = res[0]?.ufsUrl; // or res[0]?.url depending on UploadThing version
                      if (url) {
                        setImageUrl(url); // This updates your state
                      }
                    }}
                    onUploadError={(error) => {
                      console.error("Upload failed:", error);
                    }}
                  />
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    placeholder="Or paste image URL here"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="date">Date & Time</FieldLabel>
                <FieldDescription>
                  When the event will take place.
                </FieldDescription>
                <Input id="date" name="date" type="datetime-local" required />
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
              {pending ? "Creating..." : "Create Event"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
