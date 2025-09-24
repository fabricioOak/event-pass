import type { FastifyInstance } from "fastify";
import { container } from "../../../config/inversify.config.ts";
import { createUserSchema } from "../schemas/create.schema.ts";
import { paginationQuerySchema } from "../schemas/pagination.schema.ts";
import { userParamsSchema } from "../schemas/params.schema.ts";
import { updateUserSchema } from "../schemas/update.schema.ts";
import { ESwaggerTags } from "../../../shared/enums/swaggerTags.enum.ts";
import type { IUserController } from "../../../shared/interfaces/users/UserController.ts";
import { checkRole } from "../../../shared/middlewares/check-roles.ts";
import { roles } from "../../../shared/utils/roles.ts";

export async function userRoutes(app: FastifyInstance) {
  const userController = container.get(
    Symbol.for("UserController")
  ) as IUserController;

  app.post("/", {
    schema: {
      body: createUserSchema,
      tags: [ESwaggerTags.USERS],
    },
    handler: userController.createUser.bind(userController),
  });

  app.get("/", {
    schema: {
      querystring: paginationQuerySchema,
      tags: [ESwaggerTags.USERS],
    },
    preHandler: [app.authenticate, checkRole([roles.ADMIN])],
    handler: userController.findManyUsers.bind(userController),
  });

  app.get("/:id", {
    schema: {
      params: userParamsSchema,
      tags: [ESwaggerTags.USERS],
    },
    preHandler: [app.authenticate],
    handler: userController.findUserById.bind(userController),
  });

  app.put("/:id", {
    schema: {
      params: userParamsSchema,
      body: updateUserSchema,
      tags: [ESwaggerTags.USERS],
    },
    preHandler: [app.authenticate],
    handler: userController.updateUser.bind(userController),
  });

  app.delete("/:id", {
    schema: {
      params: userParamsSchema,
      tags: [ESwaggerTags.USERS],
    },
    preHandler: [app.authenticate],
    handler: userController.deleteUser.bind(userController),
  });
}
