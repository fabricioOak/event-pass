import type { FastifyRequest, FastifyReply } from "fastify";
import type { CreateUserInput } from "../../../modules/users/schemas/create.schema.ts";
import type { UpdateUserInput } from "../../../modules/users/schemas/update.schema.ts";
import type { PaginationQuery } from "../../../modules/users/schemas/pagination.schema.ts";

export interface IUserController {
  createUser(
    request: FastifyRequest<{
      Body: CreateUserInput;
    }>,
    reply: FastifyReply
  ): Promise<void>;
  findManyUsers(
    request: FastifyRequest<{
      Querystring: PaginationQuery;
    }>,
    reply: FastifyReply
  ): Promise<void>;
  findUserById(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply
  ): Promise<void>;
  updateUser(
    request: FastifyRequest<{
      Body: UpdateUserInput;
      Params: { id: string };
    }>,
    reply: FastifyReply
  ): Promise<void>;
  deleteUser(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply
  ): Promise<void>;
}
