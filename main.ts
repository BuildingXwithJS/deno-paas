import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { authRouter } from "./src/auth.ts";

const homeRouter = new Router();
homeRouter
  .get("/", context => {
    context.response.body = "Hello Deno PaaS!";
  });

const app = new Application();
// home route
app.use(homeRouter.routes());
app.use(homeRouter.allowedMethods());
// auth routes
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

app.listen({ port: 8000 });
