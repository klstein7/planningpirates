import { API } from "@/lib/server/actions";
import { createContext } from "react";

export const PlayersContext = createContext<API["players"]["find"]>([]);
