import { LandingCard } from "@/app/_components/landing-card";
import { SignInForm } from "./_components/sign-in-form";
import { getSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { api } from "@/lib/trpc/api";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    await api.profiles.sync.mutate();
    redirect("/");
  }

  return (
    <div className="flex h-full w-full bg-[url('/images/bg.png')] bg-center">
      <div className="flex h-full w-full items-center justify-center backdrop-blur-md">
        <LandingCard>
          <SignInForm />
        </LandingCard>
      </div>
    </div>
  );
}
