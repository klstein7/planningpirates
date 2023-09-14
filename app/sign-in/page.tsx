import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LandingCard } from "@/app/_components/landing-card";
import { cn } from "@/lib/utils";
import { Gluten } from "next/font/google";

const gluten = Gluten({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  return (
    <div className="flex h-full w-full bg-[url('/images/bg.png')] bg-cover bg-center">
      <div className="flex h-full w-full items-center justify-center backdrop-blur-md">
        <LandingCard>
          <div className="flex flex-col gap-6">Test</div>
        </LandingCard>
      </div>
    </div>
  );
}
