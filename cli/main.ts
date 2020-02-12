// grab the first argument and consider it entrypoint
const { args } = Deno;

const tokenString = args.find(str => str.startsWith('--token='));
const token = tokenString.replace('--token=', '');
const entrypoint = args.filter(str => str !== tokenString).pop();

console.log('Deploying:', entrypoint, 'with token:', token);

// compile given entrypoint using deno
const [ , outputCode ] = await Deno.bundle(entrypoint);
console.log('Bundled code, proceeding to deploy..');

// send the code to the server
const response = await fetch('http://localhost:8000/deploy', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({code: outputCode, name: entrypoint}),
}).then(r => r.text());

console.log({response})