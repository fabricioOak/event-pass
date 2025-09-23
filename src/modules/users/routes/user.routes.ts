import type { FastifyInstance } from "fastify";
import { container } from "../../../config/inversify.config.ts";
import type { UserController } from "../controllers/user.controller.ts";
import { createUserSchema } from "../schemas/create.schema.ts";
import { paginationQuerySchema } from "../schemas/pagination.schema.ts";
import { userParamsSchema } from "../schemas/params.schema.ts";
import { updateUserSchema } from "../schemas/update.schema.ts";

export async function userRoutes(app: FastifyInstance) {
  const userController = container.get(
    Symbol.for("UserController")
  ) as UserController;

  app.post("/", {
    schema: {
      body: createUserSchema,
    },
    handler: userController.createUser.bind(userController),
  });

  app.get("/", {
    schema: {
      querystring: paginationQuerySchema,
    },
    handler: userController.findManyUsers.bind(userController),
  });

  app.get("/:id", {
    schema: {
      params: userParamsSchema,
    },
    handler: userController.findUserById.bind(userController),
  });

  app.put("/:id", {
    schema: {
      params: userParamsSchema,
      body: updateUserSchema,
    },
    handler: userController.updateUser.bind(userController),
  });

  app.delete("/:id", {
    schema: {
      params: userParamsSchema,
    },
    handler: userController.deleteUser.bind(userController),
  });
}
