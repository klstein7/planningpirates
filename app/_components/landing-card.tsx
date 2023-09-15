import { cn } from "@/lib/utils";
import { Gluten } from "next/font/google";

const gluten = Gluten({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const LandingCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background flex w-full max-w-sm flex-col items-center rounded-xl border p-8 pt-0 shadow-xl">
      <div className="h-64 w-64 bg-[url('/images/logo.png')] bg-contain bg-center bg-no-repeat" />
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <h1 className={cn("text-5xl font-bold", gluten.className)}>
            planning
          </h1>
          <h1
            className={cn("text-primary text-5xl font-bold", gluten.className)}
          >
            pirates
          </h1>
        </div>
        {children}
      </div>
    </div>
  );
};
