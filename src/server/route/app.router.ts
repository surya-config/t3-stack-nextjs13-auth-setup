import { trpcRouter } from "../trpc";
import { authRouter } from "./auth.router";

export const appRouter = trpcRouter({
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
