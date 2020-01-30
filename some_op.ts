const plugin = Deno.openPlugin("./deno-paas-plugin/target/debug/libdeno_paas_plugin.so");
const some_op = plugin.ops.some_op;

function doSomeOp(): null | ArrayBufferView {
  const response = some_op.dispatch(new Uint8Array([1,2,3,4]));
  return response;
}

export default doSomeOp;
