import fastify from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { routes } from "./config/routes.ts";

import swagger from "./shared/plugins/swagger.ts";
import jwt from "./shared/plugins/jwt.ts";
import cookie from "./shared/plugins/cookie.ts";
import sensible from "./shared/plugins/sensible.ts";
import rateLimit from "./shared/plugins/rate-limit.ts";
import multipart from "./shared/plugins/multipart.ts";
import helmet from "./shared/plugins/helmet.ts";
import cors from "./shared/plugins/cors.ts";

const app = fastify({
  genReqId: () => crypto.randomUUID(),
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// 1. Core plugins
app.register(sensible);
app.register(helmet);
app.register(cors);

//2. Data handling and security
app.register(cookie);
app.register(jwt);
app.register(rateLimit);
app.register(multipart);

// 3. Documentation
app.register(swagger);

// 4. Routes
app.register(routes);

export { app };
