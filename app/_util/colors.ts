import { profiles } from "@/lib/db/schema";

export const COLORS = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as typeof profiles.color.enumValues;

export const getRandomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};

export const getBackgroundColor = (color?: (typeof COLORS)[number]) => {
  switch (color) {
    case "red":
      return "bg-red-500";
    case "orange":
      return "bg-orange-500";
    case "amber":
      return "bg-amber-500";
    case "yellow":
      return "bg-yellow-500";
    case "lime":
      return "bg-lime-500";
    case "green":
      return "bg-green-500";
    case "emerald":
      return "bg-emerald-500";
    case "teal":
      return "bg-teal-500";
    case "cyan":
      return "bg-cyan-500";
    case "sky":
      return "bg-sky-500";
    case "indigo":
      return "bg-indigo-500";
    case "violet":
      return "bg-violet-500";
    case "purple":
      return "bg-purple-500";
    case "fuchsia":
      return "bg-fuchsia-500";
    case "pink":
      return "bg-pink-500";
    case "rose":
      return "bg-rose-500";
    default:
      return "bg-blue-500";
  }
};

export const getTextColor = (color?: (typeof COLORS)[number]) => {
  switch (color) {
    case "red":
      return "text-red-50";
    case "orange":
      return "text-orange-50";
    case "amber":
      return "text-amber-50";
    case "yellow":
      return "text-yellow-50";
    case "lime":
      return "text-lime-50";
    case "green":
      return "text-green-50";
    case "emerald":
      return "text-emerald-50";
    case "teal":
      return "text-teal-50";
    case "cyan":
      return "text-cyan-50";
    case "sky":
      return "text-sky-50";
    case "indigo":
      return "text-indigo-50";
    case "violet":
      return "text-violet-50";
    case "purple":
      return "text-purple-50";
    case "fuchsia":
      return "text-fuchsia-50";
    case "pink":
      return "text-pink-50";
    case "rose":
      return "text-rose-50";
    default:
      return "text-blue-50";
  }
};
