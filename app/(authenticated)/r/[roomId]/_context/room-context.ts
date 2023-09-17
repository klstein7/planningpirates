import { API } from "@/lib/server/actions";
import { createContext } from "react";

type RoomContext = NonNullable<API["rooms"]["get"]>;

export const RoomContext = createContext<RoomContext>({} as RoomContext);
