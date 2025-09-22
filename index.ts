import { app } from "./src/app.ts";
import { env } from "./src/config/env.ts";

app.listen({
  port: env.PORT,
  host: "0.0.0.0",
});
