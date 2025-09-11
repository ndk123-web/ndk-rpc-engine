import ApiError from "../utils/ApiError.js";
import { globalRpcRegistry } from "../index.mjs";

const authMiddleware = (req, res, next) => {
  try {
    const { auth_code } = req.body;

    if (!auth_code) {
      console.log("Auth code missing in request body");
      throw new ApiError(401, "Auth code is required");
      return;
    }

    if (!globalRpcRegistry.auth_codes.has(auth_code)) {
      console.log("Invalid auth code:", auth_code);
      throw new ApiError(403, "Invalid auth code");
      return;
    }
    console.log("Auth code validated:", auth_code);
    next();
  } catch (err) {
    console.log("Unauthorized:", err.message);
    throw new ApiError(500, "Something went wrong in auth middleware");
    return;
  }
};

export { authMiddleware };
