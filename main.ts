import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { setupAuth, validateToken } from "./src/auth.ts";
import { setupDeploy } from "./src/deploy.ts";

const router = new Router();
setupAuth(router)
  .get("/", context => {
    context.response.body = "Hello Deno PaaS!";
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

// authorization middleware
app.use(async (ctx, next) => {
  const authorization = ctx.request.headers.get("Authorization");
  const token = authorization.replace("Bearer ", "");
  const tokenValid = await validateToken(token);

  if (tokenValid) {
    await next();
    return;
  }

  ctx.response.body = JSON.stringify({ error: "Not authorized" });
});

// protected routes
const protectedRouter = new Router();
protectedRouter.get("/protected", context => {
  context.response.body = "Hello protected route!";
});
// add deploy routes
setupDeploy(protectedRouter);
// attach router to the app
app.use(protectedRouter.routes());
app.use(protectedRouter.allowedMethods());

app.listen({ port: 8000 });
