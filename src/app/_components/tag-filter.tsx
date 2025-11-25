"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "~/_components/ui/tabs";

export function TagFilter({ tags }: { tags: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag") ?? "all";

  const handleTagChange = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tag === "all") {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Tabs value={currentTag} onValueChange={handleTagChange}>
        <TabsList className="inline-flex w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          {tags.map((tag) => (
            <TabsTrigger key={tag} value={tag}>
              {tag}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
