import { Search } from "~/app/_components/search";
import { searchLinks } from "~/server/queries";
import {
  Card,
  CardHeader,
  CardDescription,
  CardAction,
} from "~/_components/ui/card";
import { Calendar, Edit, Link as LinkIcon } from "lucide-react";
import { Button } from "~/_components/ui/button";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/_components/ui/sheet";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/_components/ui/field";
import { Input } from "~/_components/ui/input";

export const dynamic = "force-dynamic";

function EditSheet({ linkId }: { linkId?: number }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Link</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Edit Link</SheetTitle>
          <SheetDescription>
            Make changes to the link details and save your changes.
          </SheetDescription>
        </SheetHeader>
        <form className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input id="title" name="title" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="url">URL</FieldLabel>
                <Input id="url" name="url" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="tag">Tag</FieldLabel>
                <Input id="tag" name="tag" required />
              </Field>
            </FieldGroup>
          </div>
          <SheetFooter>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

function AddSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Create Link</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Create Link</SheetTitle>
          <SheetDescription>
            Create a new link for members to view.
          </SheetDescription>
        </SheetHeader>
        <form className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <FieldDescription>The name of the link.</FieldDescription>
                <Input id="title" name="title" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="url">URL</FieldLabel>
                <FieldDescription>
                  The destination URL of the link. Include the https:// at the
                  beginning.
                </FieldDescription>
                <Input id="url" name="url" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="tag">Tag</FieldLabel>
                <Input id="tag" name="tag" required />
              </Field>
            </FieldGroup>
          </div>
          <SheetFooter>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

async function LinksGrid({ searchQuery }: { searchQuery?: string }) {
  const links = await searchLinks(searchQuery);

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <Card
          key={link.id}
          className="py-0 transition-shadow duration-300 hover:shadow-lg"
        >
          <CardHeader className="flex flex-col gap-2 p-4">
            <div className="flex flex-row items-start gap-3">
              <LinkIcon className="h-10 w-10 rounded-lg bg-blue-100 p-2 text-blue-800" />
              <div className="flex flex-col gap-1">
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold transition-colors duration-300 hover:text-blue-800"
                >
                  {link.name}
                </Link>
                <span className="w-fit rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                  {link.tag}
                </span>
              </div>
            </div>
            <CardDescription className="text-muted-foreground mt-2 text-sm">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {link.updatedAt?.toLocaleDateString() ??
                  link.createdAt.toLocaleDateString()}
              </div>
            </CardDescription>
            <CardAction className="mt-2 flex w-full justify-center">
              <span className="w-full">
                <EditSheet linkId={link.id} />
              </span>
            </CardAction>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export default async function LinksAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";

  return (
    <main className="p-4">
      <div className="flex w-full items-start justify-between p-3 pb-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold">Links</h2>
          <p className="text-muted-foreground text-sm">
            Add, edit, and manage links for members
          </p>
        </div>
        <span className="w-3/5">
          <Search placeholder="Search links..." />
        </span>
        <span className="flex w-1/4 justify-end">
          <AddSheet />
        </span>
      </div>
      <LinksGrid searchQuery={query} />
    </main>
  );
}
