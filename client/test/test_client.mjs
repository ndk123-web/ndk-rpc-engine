import { Client } from "../index.mjs";

const client = new Client({
    server_port: 5000 
})

const response = await client.request({
     method : "subtract",
     params: { a: 5 , b: 4 }  // Array format as expected by server
})

console.log("Response from server to Client : " , response);