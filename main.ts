import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { setupAuth } from "./src/auth.ts";

const router = new Router();
setupAuth(router)
  .get("/", context => {
    context.response.body = "Hello Deno PaaS!";
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
