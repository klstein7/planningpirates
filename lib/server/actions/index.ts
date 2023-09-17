import * as players from "./players";
import * as profiles from "./profiles";
import * as rooms from "./rooms";

export const api = {
  players,
  profiles,
  rooms,
};

export type PlayersType = {
  [K in keyof typeof players]: Awaited<ReturnType<(typeof players)[K]>>;
};

export type RoomsType = {
  [K in keyof typeof rooms]: Awaited<ReturnType<(typeof rooms)[K]>>;
};

export type ProfilesType = {
  [K in keyof typeof profiles]: Awaited<ReturnType<(typeof profiles)[K]>>;
};

export type API = {
  players: PlayersType;
  profiles: ProfilesType;
  rooms: RoomsType;
};
