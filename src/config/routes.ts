import type { FastifyInstance } from "fastify";
import { userRoutes } from "../modules/users/routes/user.routes.ts";

export const routes = (app: FastifyInstance) => {
  app.register(userRoutes, {
    prefix: "/users",
  });
};
