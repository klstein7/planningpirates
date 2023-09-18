import { auth, currentUser } from "@clerk/nextjs";

export const authorize = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return { user };
};
