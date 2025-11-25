"use server";

import { checkRole } from "~/lib/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function setRole(formData: FormData) {
  const client = await clerkClient();

  // Check that the user trying to set the Role is an admin
  if (!(await checkRole("admin"))) {
    return { message: "Not Authorized" };
  }

  try {
    const res = await client.users.updateUserMetadata(
      formData.get("id") as string,
      {
        publicMetadata: { role: formData.get("role") },
      },
    );
    revalidatePath("/admin");
    redirect("/admin");
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}

export async function removeRole(formData: FormData) {
  const client = await clerkClient();

  try {
    const res = await client.users.updateUserMetadata(
      formData.get("id") as string,
      {
        publicMetadata: { role: null },
      },
    );
    revalidatePath("/admin");
    redirect("/admin");
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}
