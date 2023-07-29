import { loginSchema } from "src/schema/login.schema";
import { trpcProcedure, trpcRouter } from "../trpc";
import { loginUser, registerUser } from "./authOps";
import { registerSchema } from "src/schema/register.schema";
import { supabase } from "lib/supabase";
import { z } from "zod";

export const authRouter = trpcRouter({
  loginUser: trpcProcedure.input(loginSchema).mutation(async ({ input }) => {
    const { email, password } = input;
    const userData = await loginUser(email, password);
    return userData;
  }),
  registerUser: trpcProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const { email, password, role } = input;

      const response = await registerUser(email, password, role);
      return response;
    }),
  getUser: trpcProcedure.query(async () => {
    const user = await supabase.auth.getUser();
    return user;
  }),
});

// export type definition of API
export type authRouter = typeof authRouter;
