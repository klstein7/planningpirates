import { currentUser } from "@clerk/nextjs";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const user = await currentUser();

  console.log(user);
};
