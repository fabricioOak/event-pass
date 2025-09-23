/* eslint-disable @typescript-eslint/no-unused-vars */
import type { JWT } from "@fastify/jwt";
import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import type { UserPayload } from "../types/users/user.types.ts";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
    user: UserPayload;
  }

  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: UserPayload;
  }
}
