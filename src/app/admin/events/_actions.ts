"use server";

import { checkRole } from "~/lib/roles";
import { db } from "~/server/db";
import { events } from "~/server/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type FormState = {
  error?: string;
} | null;

export async function createEvent(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Check admin role (this also validates authentication)
  if (!(await checkRole("admin"))) {
    return { error: "Not authorized" };
  }

  // Extract and validate form data
  const name = formData.get("name") as string;
  const location = formData.get("location") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const dateStr = formData.get("date") as string;
  const endDateStr = formData.get("endDate") as string;

  // Validate required fields
  if (!name?.trim() || !location?.trim() || !dateStr) {
    return { error: "All fields are required" };
  }

  // Validate lengths against schema constraints
  if (name.length > 256) {
    return { error: "Name must be 256 characters or less" };
  }
  if (location.length > 256) {
    return { error: "Location must be 256 characters or less" };
  }
  if (imageUrl && imageUrl.length > 1024) {
    return { error: "Image URL must be 1024 characters or less" };
  }

  // Validate date
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return { error: "Invalid date" };
  }

  // Validate end date if provided
  let endDate: Date | null = null;
  if (endDateStr) {
    endDate = new Date(endDateStr);
    if (isNaN(endDate.getTime())) {
      return { error: "Invalid end date" };
    }
    if (endDate < date) {
      return { error: "End date cannot be before start date" };
    }
  }

  // Insert into database
  try {
    await db.insert(events).values({
      name: name.trim(),
      location: location.trim(),
      imageUrl: imageUrl.trim() || null,
      date,
      endDate,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return { error: "Database error: Unable to create event." };
  }

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function updateEvent(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Check admin role (this also validates authentication)
  if (!(await checkRole("admin"))) {
    return { error: "Not authorized" };
  }

  // Extract event ID
  const eventIdStr = formData.get("eventId") as string;
  const eventId = parseInt(eventIdStr);

  if (!eventId || isNaN(eventId)) {
    return { error: "Invalid event ID" };
  }

  // Extract and validate form data
  const name = formData.get("name") as string;
  const location = formData.get("location") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const dateStr = formData.get("date") as string;
  const endDateStr = formData.get("endDate") as string;

  // Validate required fields
  if (!name?.trim() || !location?.trim() || !dateStr) {
    return { error: "All fields are required" };
  }

  // Validate lengths against schema constraints
  if (name.length > 256) {
    return { error: "Name must be 256 characters or less" };
  }
  if (location.length > 256) {
    return { error: "Location must be 256 characters or less" };
  }
  if (imageUrl && imageUrl.length > 1024) {
    return { error: "Image URL must be 1024 characters or less" };
  }

  // Validate date
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return { error: "Invalid date" };
  }

  // Validate end date if provided
  let endDate: Date | null = null;
  if (endDateStr) {
    endDate = new Date(endDateStr);
    if (isNaN(endDate.getTime())) {
      return { error: "Invalid end date" };
    }
    if (endDate < date) {
      return { error: "End date cannot be before start date" };
    }
  }

  // Update in database
  try {
    await db
      .update(events)
      .set({
        name: name.trim(),
        location: location.trim(),
        imageUrl: imageUrl.trim() || null,
        date,
        endDate,
      })
      .where(eq(events.id, eventId));
  } catch (error) {
    console.error("Error updating event:", error);
    return { error: "Database error: Unable to update event." };
  }

  revalidatePath("/admin/events");
  return null;
}

export async function deleteEvent(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Check admin role (this also validates authentication)
  if (!(await checkRole("admin"))) {
    throw new Error("Not authorized");
  }
  // Extract event ID
  const eventIdStr = formData.get("eventId") as string;
  const eventId = parseInt(eventIdStr);

  if (!eventId || isNaN(eventId)) {
    return { error: "Invalid event ID" };
  }
  // Delete from database
  try {
    await db.delete(events).where(eq(events.id, eventId));
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Database error: Unable to delete event.");
  }

  revalidatePath("/admin/events");
  redirect("/admin/events");
}
