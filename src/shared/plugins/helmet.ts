import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import { fastifyHelmet } from "@fastify/helmet";
import { env } from "../../config/env.ts";

export default fp(async (app: FastifyInstance) => {
  if (env.NODE_ENV === "development") {
    return;
  }

  app.register(fastifyHelmet);
});
