import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import { fastifyRateLimit } from "@fastify/rate-limit";

export default fp(async (app: FastifyInstance) => {
  await app.register(fastifyRateLimit, {
    global: true,
    max: 100,
    timeWindow: "1 minute",
  });
});
