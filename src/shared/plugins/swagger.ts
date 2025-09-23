import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifyApiReference from "@scalar/fastify-api-reference";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { ESwaggerTags } from "../enums/swaggerTags.enum.ts";

export default fp(async (app: FastifyInstance) => {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Event Pass API",
        description: "API documentation for Event Pass",
        version: "1.0.0",
      },
      tags: [
        {
          name: ESwaggerTags.AUTH,
          description: "Authentication endpoints",
        },
        {
          name: ESwaggerTags.EVENTS,
          description: "Event endpoints",
        },
        {
          name: ESwaggerTags.USERS,
          description: "User endpoints",
        },
      ],
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifyApiReference, {
    routePrefix: "/docs",
  });
});
