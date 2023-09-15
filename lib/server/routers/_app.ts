import { computersRouter } from "./computers";
import { router } from "../trpc";
import { profilesRouter } from "./profiles";
import { roomsRouter } from "./rooms";
import { playersRouter } from "./players";

export const appRouter = router({
  profiles: profilesRouter,
  rooms: roomsRouter,
  players: playersRouter,
});

export type AppRouter = typeof appRouter;
