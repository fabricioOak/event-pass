import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { env } from "../../config/env.ts";
import type { UserPayload } from "../types/users/user.types.ts";

export default fp(async (app: FastifyInstance) => {
  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      try {
        const token = request.cookies?.access_token;
        if (!token) {
          reply
            .status(401)
            .send({ success: false, message: "Token not found" });
          return;
        }
        const decoded = app.jwt.verify<UserPayload>(token);
        request.user = decoded;
      } catch (err) {
        console.error(err);
        reply
          .status(401)
          .send({ success: false, message: "Token inválido ou expirado" });
      }
    }
  );
});
