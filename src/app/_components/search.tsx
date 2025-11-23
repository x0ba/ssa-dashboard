"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "~/app/_components/ui/input";

export function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Debounce prevents updating the URL on every single keystroke
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 250) as (term: string) => void;

  return (
    <div className="relative flex items-center">
      <SearchIcon className="text-muted-foreground absolute left-3 h-4 w-4" />
      <Input
        className="rounded-lg border p-2 pl-9"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("q")?.toString()}
      />
    </div>
  );
}
