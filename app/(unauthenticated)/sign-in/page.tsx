import { LandingCard } from "@/app/_components/landing-card";
import { SignInForm } from "./_components/sign-in-form";

export default async function SignInPage() {
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
