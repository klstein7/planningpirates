import { LandingCard } from "../_components/landing-card";
import { LandingForm } from "../_components/landing-form";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <LandingCard>
        <LandingForm />
      </LandingCard>
    </div>
  );
}
