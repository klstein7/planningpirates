import { cn } from "@/lib/utils";

export const BackgroundImage = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="relative flex h-full w-full bg-[url('/images/bg.png')] bg-center">
      <div className={cn("z-10 flex flex-1", className)}>{children}</div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-black/80" />
    </div>
  );
};
