import ndk_rpc_server from "../server/index.mjs";

let server = new ndk_rpc_server({ port: 5000 });

const subtract = ({a, b}) => a - b;
const hello = () => "Hello, World!";

const isRegistered = await server.register_functions([
  {
    function_name: "subtract",
    function_block: subtract,
  },
  {
    function_name: "hello",
    function_block: hello,
  }
]);

await server.start();
