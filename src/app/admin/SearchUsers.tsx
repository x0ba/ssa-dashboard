"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/_components/ui/button";
import { Input } from "~/_components/ui/input";
import { Label } from "~/_components/ui/label";

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
        className="flex w-full max-w-2xl flex-col items-stretch gap-2 sm:flex-row sm:items-end"
      >
        <div className="grid w-full flex-1 items-center gap-1.5">
          <Label htmlFor="search">Search Users</Label>
          <Input
            id="search"
            name="search"
            type="text"
            placeholder="Search by name or email..."
          />
        </div>
        <Button type="submit" className="sm:shrink-0">
          Search
        </Button>
      </form>
    </div>
  );
};
