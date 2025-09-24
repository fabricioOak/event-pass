import type { FastifyRequest, FastifyReply } from "fastify";

export interface IUserController {
  createUser(request: FastifyRequest, reply: FastifyReply): Promise<void>;

  findManyUsers(request: FastifyRequest, reply: FastifyReply): Promise<void>;

  findUserById(request: FastifyRequest, reply: FastifyReply): Promise<void>;

  updateUser(request: FastifyRequest, reply: FastifyReply): Promise<void>;

  deleteUser(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
