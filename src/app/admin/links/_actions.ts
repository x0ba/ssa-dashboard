"use server";

import { db } from "~/server/db";
import { links } from "~/server/db/schema";
import { checkRole } from "~/lib/roles";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type FormState = {
  error?: string;
} | null;

export async function createLink(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Check admin role (this also validates authentication)
  if (!(await checkRole("admin"))) {
    return { error: "Not authorized" };
  }

  // Extract and validate form data
  const name = formData.get("name") as string;
  const url = formData.get("url") as string;
  const tag = formData.get("tag") as string;

  // Validate required fields
  if (!name?.trim() || !url?.trim() || !tag?.trim()) {
    return { error: "All fields are required" };
  }

  // Validate lengths against schema constraints
  if (name.length > 256) {
    return { error: "Name must be 256 characters or less" };
  }
  if (url.length > 1024) {
    return { error: "URL must be 1024 characters or less" };
  }
  if (tag.length > 256) {
    return { error: "Tag must be 256 characters or less" };
  }

  // Validate URL format
  try {
    const urlObj = new URL(url);
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return { error: "URL must start with http:// or https://" };
    }
  } catch {
    return { error: "Invalid URL format" };
  }

  // Insert into database
  try {
    await db.insert(links).values({
      name: name.trim(),
      url: url.trim(),
      tag: tag.trim(),
    });
  } catch (err) {
    console.error("Database insertion error:", err);
    return { error: "Failed to create link. Please try again." };
  }

  // Revalidate and redirect
  revalidatePath("/admin/links");
  redirect("/admin/links");
}

export async function updateLink(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!(await checkRole("admin"))) {
    return { error: "Not authorized" };
  }

  const linkId = Number(formData.get("linkId"));
  const name = formData.get("name") as string;
  const url = formData.get("url") as string;
  const tag = formData.get("tag") as string;

  if (!linkId || !name?.trim() || !url?.trim() || !tag?.trim()) {
    return { error: "All fields are required" };
  }

  if (name.length > 256) {
    return { error: "Name must be 256 characters or less" };
  }
  if (url.length > 1024) {
    return { error: "URL must be 1024 characters or less" };
  }
  if (tag.length > 256) {
    return { error: "Tag must be 256 characters or less" };
  }

  try {
    const urlObj = new URL(url);
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return { error: "URL must start with http:// or https://" };
    }
  } catch {
    return { error: "Invalid URL format" };
  }

  try {
    await db
      .update(links)
      .set({
        name: name.trim(),
        url: url.trim(),
        tag: tag.trim(),
      })
      .where(eq(links.id, linkId));
  } catch (err) {
    console.error("Database update error:", err);
    return { error: "Failed to update link. Please try again." };
  }

  revalidatePath("/admin/links");
  redirect("/admin/links");
}

export async function deleteLink(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!(await checkRole("admin"))) {
    return { error: "Not authorized" };
  }

  const linkId = Number(formData.get("linkId"));

  if (!linkId) {
    return { error: "Invalid link ID" };
  }

  try {
    await db.delete(links).where(eq(links.id, linkId));
  } catch (err) {
    console.error("Database deletion error:", err);
    return { error: "Failed to delete link. Please try again." };
  }

  revalidatePath("/admin/links");
  redirect("/admin/links");
}
