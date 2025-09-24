import type { FastifyInstance } from "fastify";
import type { IAuthController } from "../../../shared/interfaces/auth/AuthController.ts";

import { container } from "../../../config/inversify.config.ts";
import { loginSchema } from "../schemas/auth.schema.ts";
import { ESwaggerTags } from "../../../shared/enums/swaggerTags.enum.ts";

export async function authRoutes(app: FastifyInstance) {
  const authController = container.get(
    Symbol.for("AuthController")
  ) as IAuthController;

  app.post("/login", {
    schema: {
      body: loginSchema,
      tags: [ESwaggerTags.AUTH],
    },
    handler: authController.login.bind(authController),
  });
  app.post("/logout", {
    schema: {
      tags: [ESwaggerTags.AUTH],
    },
    handler: authController.logout.bind(authController),
  });
}
