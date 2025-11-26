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
import { updateEvent } from "../_actions";
import { UploadButton } from "~/utils/uploadthing";

type Event = {
  id: number;
  name: string;
  imageUrl: string;
  location: string | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date | null;
};

export function EditSheet({ event }: { event: Event }) {
  const [state, formAction, pending] = useActionState(updateEvent, null);
  const [imageUrl, setImageUrl] = useState<string>(event.imageUrl);

  // Format date for datetime-local input (YYYY-MM-DDTHH:mm)
  const formatDateTimeLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Event</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Edit Event</SheetTitle>
          <SheetDescription>Edit event details.</SheetDescription>
        </SheetHeader>
        <form action={formAction} className="flex flex-1 flex-col">
          <input type="hidden" name="eventId" value={event.id} />
          <div className="flex-1 overflow-y-auto px-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <FieldDescription>The name of the event.</FieldDescription>
                <Input
                  id="name"
                  name="name"
                  defaultValue={event.name}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="location">Location</FieldLabel>
                <FieldDescription>
                  Where the event will take place.
                </FieldDescription>
                <Input
                  id="location"
                  name="location"
                  defaultValue={event.location ?? ""}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
                <FieldDescription>
                  Upload an image or paste a URL directly.
                </FieldDescription>
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
                  placeholder="or upload an image :)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="date">Date & Time</FieldLabel>
                <FieldDescription>
                  When the event will take place.
                </FieldDescription>
                <Input
                  id="date"
                  name="date"
                  type="datetime-local"
                  defaultValue={formatDateTimeLocal(new Date(event.date))}
                  required
                />
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
              {pending ? "Saving..." : "Save Changes"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
