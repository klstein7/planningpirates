"use client";

import { cn } from "@/lib/utils";
import { usePlayer } from "../_hooks/use-player";
import { ComponentPropsWithoutRef, forwardRef } from "react";

export const CardItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-background flex h-20 w-12 select-none items-center justify-center rounded text-lg font-medium transition-transform duration-150 hover:-translate-y-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardItem.displayName = "CardItem";
