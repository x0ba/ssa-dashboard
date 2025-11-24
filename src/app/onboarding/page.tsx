"use client";

import * as React from "react";
import { useUser, useSession } from "@clerk/nextjs";
import { completeOnboarding } from "./_actions";

import { Button } from "~/_components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/_components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/_components/ui/card";
import { Input } from "~/_components/ui/input";

export default function OnboardingComponent() {
  const { user } = useUser();
  const { session } = useSession();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData);
    if (res?.message === "User metadata Updated") {
      await user?.reload();
      await session?.reload();
      window.location.href = "/";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>
            Please tell us a bit about yourself to get started.
          </CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="instrument">Instrument</FieldLabel>
                <FieldDescription>
                  What instrument do you play? (It&apos;s ok if you don&apos;t
                  play one; just enter &quot;none!&quot;)
                </FieldDescription>
                <Input
                  id="instrument"
                  name="instrument"
                  placeholder="e.g. Piano"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="major">Major</FieldLabel>
                <FieldDescription>What&apos;s your major?</FieldDescription>
                <Input
                  id="major"
                  name="major"
                  placeholder="e.g. Music Performance"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="graduationYear">
                  Graduation Year
                </FieldLabel>
                <FieldDescription>
                  What year are you graduating?
                </FieldDescription>
                <Input
                  id="graduationYear"
                  name="graduationYear"
                  placeholder="e.g. 2026"
                  required
                />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="mt-6">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
