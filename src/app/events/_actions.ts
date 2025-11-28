"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { rsvps } from "~/server/db/schema";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type FormState = {
  error?: string;
} | null;

export async function rsvpToEvent(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User must be logged in to RSVP." };
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const name = user.fullName;
  const email = user.emailAddresses[0]?.emailAddress;
  const eventIdString = formData.get("eventId") as string;
  const eventId = parseInt(eventIdString, 10);

  if (!name || !email) {
    return { error: "User information is incomplete." };
  }

  if (name.length > 256) {
    return { error: "Dawg why your name so long" };
  }

  if (email.length > 256) {
    return { error: "how do you remember ts :skull emoji:" };
  }

  try {
    await db.insert(rsvps).values({
      name: name.trim(),
      email: email.trim(),
      eventId: eventId,
    });
  } catch (error) {
    console.error("Error creating RSVP:", error);
    return { error: "Database error: Unable to create RSVP." };
  }

  revalidateTag("events");
  revalidatePath("/events");
  redirect("/events");
}

export async function cancelRsvp(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User must be logged in to cancel RSVP." };
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const email = user.emailAddresses[0]?.emailAddress;
  const eventIdString = formData.get("eventId") as string;
  const eventId = parseInt(eventIdString, 10);

  if (!email) {
    return { error: "User information is incomplete." };
  }

  try {
    await db
      .delete(rsvps)
      .where(and(eq(rsvps.eventId, eventId), eq(rsvps.email, email.trim())));
  } catch (error) {
    console.error("Error cancelling RSVP:", error);
    return { error: "Database error: Unable to cancel RSVP." };
  }

  revalidateTag("events");
  revalidatePath("/events");
  redirect("/events");
}
