"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mb-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get("search") as string;
          router.push(pathname + "?search=" + queryTerm);
        }}
        className="flex w-full max-w-sm items-end gap-2"
      >
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="search">Search Users</Label>
          <Input
            id="search"
            name="search"
            type="text"
            placeholder="Search by name or email..."
          />
        </div>
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
};
