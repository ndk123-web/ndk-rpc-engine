import { randomBytes } from "crypto";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { globalRpcRegistry } from "../index.mjs";
import chalk from "chalk";
import figlet from "figlet";

const GiveAuthCode = async (req, res) => {
  try {
    const auth_code = randomBytes(16).toString("hex");

    // DEBUG
    // console.log("Auth Code Request Received");
    // Store auth code in global registry
    globalRpcRegistry.auth_codes.add(auth_code);
    console.log("Generated auth code: ", auth_code);
    const response = new ApiResponse(200, "Auth code generated successfully", {
      auth_code,
    });

    // DEBUG
    console.log("Auth Code Response Sent", response.data.auth_code);

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    throw new ApiError(500, "Something went wrong while generating auth code");
  }
};

const RunRpcMethod = async (req, res) => {
  try {
    // console.log("RPC GLOBAL REGISTRY: " , globalRpcRegistry);
    const { method_name, params, auth_code } = req.body;

    // Validate required fields
    if (!method_name) {
      throw new ApiError(400, "method_name is required");
    }

    // Find the requested method
    const methodObj = globalRpcRegistry.methods.find(
      (method) => method.function_name === method_name
    );

    if (!methodObj) {
      throw new ApiError(404, `Method '${method_name}' not found`);
    }

    // Execute the method with provided parameters
    let result;
    if (params && Array.isArray(params)) {
      result = await methodObj.function_block(...params);
    } else if (params) {
      result = await methodObj.function_block(params);
    } else {
      result = await methodObj.function_block();
    }

    const response = new ApiResponse(200, "Method executed successfully", {
      method_name,
      result,
    });

    // Inside RunRpcMethod after execution
    console.log(
      chalk.yellowBright("⚡ Method: ") +
        chalk.white(method_name) +
        " " +
        chalk.greenBright("→ Result: ") +
        chalk.white(result)
    );
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) {
      const response = new ApiResponse(err.statusCode, err.message);
      return res.status(err.statusCode).json(response);
    }
    throw new ApiError(500, "Something went wrong while executing RPC method");
  }
};

export { GiveAuthCode, RunRpcMethod };
