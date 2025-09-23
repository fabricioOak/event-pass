import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import fastifySensible from "@fastify/sensible";

export default fp(async (app: FastifyInstance) => {
  app.register(fastifySensible);
});
