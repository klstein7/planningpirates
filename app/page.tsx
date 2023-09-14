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
        <div className="bg-background flex w-full max-w-sm flex-col items-center rounded-xl p-6">
          <div className="mt-6 h-64 w-64 bg-[url('/images/logo.png')] bg-contain bg-center bg-no-repeat" />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center">
              <h1 className={cn("text-5xl font-bold", gluten.className)}>
                planning
              </h1>
              <h1
                className={cn(
                  "text-primary text-5xl font-bold",
                  gluten.className
                )}
              >
                pirates
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
