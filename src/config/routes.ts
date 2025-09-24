import type { FastifyInstance } from "fastify";
import { userRoutes } from "../modules/users/routes/user.routes.ts";
import { authRoutes } from "../modules/auth/routes/auth.routes.ts";

export const routes = (app: FastifyInstance) => {
  app.register(userRoutes, {
    prefix: "/users",
  });
  app.register(authRoutes, {
    prefix: "/auth",
  });
};
