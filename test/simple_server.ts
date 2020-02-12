import { serve } from "https://deno.land/std@v0.30.0/http/server.ts";

const main = async () => {
  const s = serve({ port: 9000 });
  console.log("http://localhost:9000/");
  for await (const req of s) {
    req.respond({ body: "Hello World\n" });
  }
};

main();
