import app from "./app/index.mjs";
import ApiError from "./utils/ApiError.js";
import ApiResponse from "./utils/ApiResponse.js";
import chalk from "chalk";
import figlet from "figlet";
import os from "os";

// Global registry to share RPC methods with controllers
const globalRpcRegistry = {
  methods: [],
  auth_codes: new Set(),
};

function getAllIPv4() {
  const nets = os.networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Sirf IPv4 chahiye, aur internal (127.0.0.1) ko ignore karo
      if (net.family === "IPv4" && !net.internal) {
        results.push({ interface: name, address: net.address });
      }
    }
  }

  return results;
}
// Export the registry so controllers can access it

class ndk_rpc_server {
  port = "";
  rpc_methods = [];

  constructor(port_obj) {
    let { port } = port_obj;
    this.port = port || 3000;
  }

  async start() {
    app.listen(this.port, () => {
      console.log(
        chalk.magenta(figlet.textSync("NDK-RPC", { horizontalLayout: "full" }))
      );
      console.log(
        chalk.greenBright("   Server is running at: ") +
          chalk.yellowBright.bold(`http://localhost:${this.port}`)
      );
      const localIps = getAllIPv4();

      for (let ipObj of localIps) {
        console.log(
          chalk.greenBright("   Accessible at: ") +
            chalk.yellowBright.bold(`http://${ipObj.address}:${this.port}`)
        );
      }

      console.log(chalk.cyanBright("📡 Ready to accept RPC requests..."));
    });
  }

  async register_functions(objs) {
    try {
      if (!Array.isArray(objs)) {
        throw new ApiError(400, "Input should be an array of objects");
      }

      for (let obj of objs) {
        // Allowed keys
        const allowedKeys = ["function_name", "function_block"];
        const keys = Object.keys(obj);

        // Extra key check
        const hasOnlyAllowed = keys.every((k) => allowedKeys.includes(k));
        if (!hasOnlyAllowed || keys.length !== allowedKeys.length) {
          throw new ApiError(
            400,
            "Each object must ONLY have function_name and function_block"
          );
        }

        // Type check
        if (typeof obj.function_name !== "string") {
          throw new ApiError(400, "function_name must be a string");
        }
        if (typeof obj.function_block !== "function") {
          throw new ApiError(400, "function_block must be a function");
        }

        // Duplicate check
        if (
          this.rpc_methods.some((fn) => fn.function_name === obj.function_name)
        ) {
          throw new ApiError(
            400,
            `Function ${obj.function_name} is already registered`
          );
        }

        this.rpc_methods.push(obj);
        // Also add to global registry for controller access
        globalRpcRegistry.methods.push(obj);
        // console.log(`Global Registered function: ${globalRpcRegistry}`);
      }

      //   console.log("Registered functions:", this.rpc_methods);
      return true;
    } catch (err) {
      throw new ApiError(
        err.status || 500,
        err.message || "Internal Server Error"
      );
    }
  }
}

export default ndk_rpc_server;
export { globalRpcRegistry };
