import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import { fastifyCors } from "@fastify/cors";

export default fp(async (app: FastifyInstance) => {
  app.register(fastifyCors, {
    origin: "*", // Allow all origins
  });
});
