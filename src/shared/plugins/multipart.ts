import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";

export default fp(async (app: FastifyInstance) => {
  app.register(fastifyMultipart);
});
