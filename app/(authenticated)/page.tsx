import { LandingCard } from "../_components/landing-card";
import { LandingForm } from "../_components/landing-form";

export default function Home() {
  return (
    <div className="flex h-full w-full bg-[url('/images/bg.png')] bg-center">
      <div className="flex h-full w-full items-center justify-center backdrop-blur-md">
        <LandingCard>
          <LandingForm />
        </LandingCard>
      </div>
    </div>
  );
}
