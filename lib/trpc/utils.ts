import { env } from "@/lib/env.mjs";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "../server/routers/_app";
function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
