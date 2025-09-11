import { Client } from "../index.mjs";

const client = new Client();

// Initialize with server port and get auth code
const { auth_code } = await client.init({ server_port: 4000 });
console.log("Received Auth Code: ", auth_code);

const response = await client.request({
  method: "add",
  params: { a: 5, b: 4 },
  auth_code: auth_code,
});

console.log("Response from server to Client : ", response);
