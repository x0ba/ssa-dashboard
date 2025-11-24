import { redirect } from "next/navigation";
import { checkRole } from "~/lib/roles";
import { SearchUsers } from "./SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./_actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/_components/ui/card";
import { Button } from "~/_components/ui/button";

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  if (!(await checkRole("admin"))) {
    redirect("/");
  }

  const query = (await params.searchParams).search;

  const client = await clerkClient();

  const users = query ? (await client.users.getUserList({ query })).data : [];

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users and roles. Restricted to users with the `admin` role.
        </p>
      </div>

      <SearchUsers />

      {query && users.length === 0 && (
        <p className="text-muted-foreground mt-4 text-sm">No users found.</p>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => {
          const primaryEmail = user.emailAddresses.find(
            (email) => email.id === user.primaryEmailAddressId,
          )?.emailAddress;
          const currentRole = (user.publicMetadata.role as string) || "member";

          return (
            <Card key={user.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {user.firstName} {user.lastName}
                </CardTitle>
                <CardDescription className="truncate" title={primaryEmail}>
                  {primaryEmail}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between rounded-md border p-2 text-sm">
                  <span className="font-medium">Role</span>
                  <span className="bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-xs font-bold uppercase">
                    {currentRole}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <form
                      action={async (formData) => {
                        "use server";
                        await setRole(formData);
                      }}
                      className="contents"
                    >
                      <input type="hidden" value={user.id} name="id" />
                      <input type="hidden" value="admin" name="role" />
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        disabled={currentRole === "admin"}
                      >
                        Make Admin
                      </Button>
                    </form>

                    <form
                      action={async (formData) => {
                        "use server";
                        await setRole(formData);
                      }}
                      className="contents"
                    >
                      <input type="hidden" value={user.id} name="id" />
                      <input type="hidden" value="moderator" name="role" />
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        disabled={currentRole === "moderator"}
                      >
                        Make Mod
                      </Button>
                    </form>
                  </div>

                  <form
                    action={async (formData) => {
                      "use server";
                      await removeRole(formData);
                    }}
                    className="w-full"
                  >
                    <input type="hidden" value={user.id} name="id" />
                    <Button
                      type="submit"
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      disabled={currentRole === "member"}
                    >
                      Remove Role
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
