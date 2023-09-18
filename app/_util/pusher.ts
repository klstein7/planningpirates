import { env } from "@/lib/env.mjs";
import Pusher from "pusher-js";

export const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
});
