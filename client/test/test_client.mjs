import { Client } from "../index.mjs";

const client = new Client({
    server_port: 4000 
})

const response = await client.request({
     method : "add",
     params: { a: 5 , b:3 }  // Array format as expected by server
})

console.log("Response from server to Client : " , response);