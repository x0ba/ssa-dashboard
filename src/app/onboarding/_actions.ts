"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (formData: FormData) => {
  const client = await clerkClient();
  const { userId } = await auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  try {
    const user = await client.users.getUser(userId);

    await client.users.updateUser(userId, {
      publicMetadata: {
        ...user.publicMetadata,
        onboardingComplete: true,
        instrument: formData.get("instrument"),
        major: formData.get("major"),
        graduationYear: formData.get("graduationYear"),
      },
    });
    return { message: "User metadata Updated" };
  } catch (e) {
    console.log("error", e);
    return { message: "Error Updating User Metadata" };
  }
};
