import ndk_rpc_server from "../server/index.mjs";

let server1 = new ndk_rpc_server({ port: 4000 });
let server2 = new ndk_rpc_server({ port: 5000 });

const add = ({ a, b }) => a + b;
const sub = ({ a, b }) => a - b;

await server1.register_functions([
  {
    function_name: "add",
    function_block: add,
  },
]);

await server2.register_functions([
  {
    function_block: sub,
    function_name: "sub",
  },
]);

await server1.start();
await server2.start();