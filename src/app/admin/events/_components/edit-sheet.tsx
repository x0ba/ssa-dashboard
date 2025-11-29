"use client";

import { useActionState, useEffect, useState } from "react";
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

import { toast } from "sonner";

type Event = {
  id: number;
  name: string;
  imageUrl: string | null;
  location: string | null;
  date: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
};

export function EditSheet({ event }: { event: Event }) {
  const [state, formAction, pending] = useActionState(updateEvent, null);
  const [imageUrl, setImageUrl] = useState<string>(
    event.imageUrl ??
      "https://ba961nquml.ufs.sh/f/8WZL3qQlnrib7eKeL1A2EOHTiwGzyx0cWs9IqK7hPnj3YaLU",
  );
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state === null && !pending) {
      setOpen(false);
    }
  }, [state, pending]);

  // Format date for datetime-local input (YYYY-MM-DDTHH:mm) in UTC
  const formatDateTimeLocal = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          Edit Event
        </Button>
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
                <FieldLabel htmlFor="imageUrl">
                  Flyer Image (optional)
                </FieldLabel>
                <FieldDescription>Upload an image.</FieldDescription>
                <UploadButton
                  endpoint={"imageUploader"}
                  onClientUploadComplete={(res) => {
                    // Extract the URL from the response
                    const url = res[0]?.ufsUrl; // or res[0]?.url depending on UploadThing version
                    if (url) {
                      setImageUrl(url); // This updates your state
                      setUploadedFileName(res[0]?.name ?? "Image uploaded");
                      toast.success("Image uploaded successfully");
                    }
                  }}
                  onUploadError={(error) => {
                    console.error("Upload failed:", error);
                    toast.error("Upload failed");
                  }}
                />
                {uploadedFileName && (
                  <div className="text-muted-foreground text-sm">
                    Uploaded: {uploadedFileName}
                  </div>
                )}
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  hidden
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="date">Start Date & Time</FieldLabel>
                <FieldDescription>When the event will start.</FieldDescription>
                <Input
                  id="date"
                  name="date"
                  type="datetime-local"
                  defaultValue={formatDateTimeLocal(new Date(event.date))}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="endDate">
                  End Date & Time (Optional)
                </FieldLabel>
                <FieldDescription>When the event will end.</FieldDescription>
                <Input
                  id="endDate"
                  name="endDate"
                  type="datetime-local"
                  defaultValue={
                    event.endDate
                      ? formatDateTimeLocal(new Date(event.endDate))
                      : ""
                  }
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
