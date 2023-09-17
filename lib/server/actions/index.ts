import * as players from "./players";
import * as rooms from "./rooms";

export const api = {
  players,
  rooms,
};

export type PlayersType = {
  [K in keyof typeof players]: Awaited<ReturnType<(typeof players)[K]>>;
};

export type RoomsType = {
  [K in keyof typeof rooms]: Awaited<ReturnType<(typeof rooms)[K]>>;
};

export type API = {
  players: PlayersType;
  rooms: RoomsType;
};
