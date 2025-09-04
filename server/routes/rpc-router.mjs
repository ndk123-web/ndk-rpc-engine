import { Router } from "express";
import { GiveAuthCode , RunRpcMethod  } from "../controller/rpc_controller.mjs";

const rpc_router = Router();

rpc_router.get('/give-auth-code' , GiveAuthCode )
rpc_router.post('/run-rpc-method', RunRpcMethod )

export default rpc_router;