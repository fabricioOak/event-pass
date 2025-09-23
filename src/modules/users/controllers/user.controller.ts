import { injectable, inject } from "inversify";
import type { FastifyRequest, FastifyReply } from "fastify";
import type { CreateUserInput } from "../schemas/create.schema.ts";
import type { PaginationQuery } from "../schemas/pagination.schema.ts";
import type { UpdateUserInput } from "../schemas/update.schema.ts";
import type { IUserService } from "../../../shared/interfaces/users/UserService.ts";

@injectable()
export class UserController {
  constructor(
    @inject(Symbol.for("UserService"))
    private userService: IUserService
  ) {}

  public async createUser(
    request: FastifyRequest<{
      Body: CreateUserInput;
    }>,
    reply: FastifyReply
  ) {
    const user = await this.userService.createUser(request.body);

    if (!user) {
      return reply.conflict("User with this email already exists.");
    }

    return reply.code(201).send({
      success: true,
      data: user,
      message: "User created successfully.",
    });
  }

  public async findManyUsers(
    request: FastifyRequest<{
      Querystring: PaginationQuery;
    }>,
    reply: FastifyReply
  ) {
    const users = await this.userService.findManyUsers(request.query);

    return reply.code(200).send({
      success: true,
      data: users,
      message: "Users found successfully.",
    });
  }

  public async findUserById(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply
  ) {
    const user = await this.userService.findUserById(request.params.id);

    if (!user) {
      return reply.notFound("User not found.");
    }

    return reply.code(200).send({
      success: true,
      data: user,
      message: "User found successfully.",
    });
  }

  public async updateUser(
    request: FastifyRequest<{
      Body: UpdateUserInput;
      Params: { id: string };
    }>,
    reply: FastifyReply
  ) {
    const updatedUser = await this.userService.updateUser(
      request.params.id,
      request.body
    );

    if (!updatedUser) {
      return reply.notFound("User not found.");
    }

    return reply.code(200).send({
      success: true,
      data: updatedUser,
      message: "User updated successfully.",
    });
  }

  public async deleteUser(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply
  ) {
    await this.userService.deleteUser(request.params.id);

    return reply.code(204).send();
  }
}
