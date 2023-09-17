"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { RiGithubFill, RiGoogleFill } from "react-icons/ri";
import { HiEnvelope } from "react-icons/hi2";
import { signIn } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";

export const SignInForm = () => {
  const params = useSearchParams();
  const form = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="flex w-full flex-col gap-3">
      <Form {...form}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <HiEnvelope />
                  </div>
                  <Input
                    className="pl-9"
                    placeholder="Sign in with email"
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </Form>
      <Button>Sign in with email</Button>
      <Separator />
      <Button
        variant="outline"
        onClick={() => {
          const callbackUrl = params.get("callbackUrl");

          signIn("google", {
            callbackUrl: callbackUrl || undefined,
          });
        }}
      >
        <RiGoogleFill className="mr-2 h-5 w-5" />
        Sign in with Google
      </Button>
      <Button variant="outline">
        <RiGithubFill className="mr-2 h-5 w-5" />
        Sign in with Github
      </Button>
    </div>
  );
};
