import { writeFileStr } from "https://deno.land/std/fs/mod.ts";

const deployments = [];

const deploy = async context => {
  const { value: {name, code} } = await context.request.body();

  await writeFileStr("./temp.js", code);

  // execute
  const p = Deno.run({
    args: [
      "deno",
      "run",
      "--allow-read",
      "--allow-net",
      "./temp.js"
    ],
    stdout: "piped",
    stderr: "piped"
  });

  deployments.push({name, ref: p, status: 'running'});
  p.status().then(async ({ code }) => {
    if (code === 0) {
      const rawOutput = await p.output();
      await Deno.stdout.write(rawOutput);
    } else {
      const rawError = await p.stderrOutput();
      const errorString = new TextDecoder().decode(rawError);
      console.log(errorString);
    }
  });

  context.response.body = JSON.stringify({ success: true });
};

const deploymentsList = async context => {
  context.response.body = JSON.stringify(deployments);
};

const deleteDeployment = async context => {
  const { value: {name} } = await context.request.body();

  const deployment = deployments.find(d => d.name === name);
  deployment.ref.kill(1);
  deployment.status = 'closed';
  console.log('found', deployment);

  context.response.body = JSON.stringify({ success: true });
}

export const setupDeploy = (router) => {
  router
    .post("/deploy", deploy)
    .get("/deployments", deploymentsList)
    .delete("/deployment", deleteDeployment);
  return router;
};
