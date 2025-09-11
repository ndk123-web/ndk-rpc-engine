import { Router } from "express";
import { GiveAuthCode, RunRpcMethod } from "../controller/rpc_controller.mjs";
import { authMiddleware } from "../utils/middleware.js";

const rpc_router = Router();

rpc_router.get("/give-auth-code", GiveAuthCode);
rpc_router.post("/run-rpc-method", authMiddleware, RunRpcMethod);

export default rpc_router;
