import ndk_rpc_server from "../server/index.mjs";

let server = new ndk_rpc_server({ port: 4000 });

const add = ({a, b}) => a + b;
const subtract = ({a, b}) => a - b;

const isRegistered = await server.register_function([
  {
    function_name: "add",
    function_block: add,
  },
  {
    function_name: "subtract",
    function_block: subtract,
  }
]);

await server.start();
