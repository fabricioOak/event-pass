import type { FastifyRequest, FastifyReply } from "fastify";

export interface IAuthController {
  login(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  logout(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
