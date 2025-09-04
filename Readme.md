# NDK-RPC-Engine

A lightweight RPC (Remote Procedure Call) engine built from scratch in Node.js. It allows you to easily register functions on the server and call them remotely from a client using simple JSON-based requests.

---

## 🚀 About This Project

NDK-RPC-Engine provides a minimal and extensible way to:

* Register server-side functions globally.
* Call those functions from clients over HTTP.
* Get structured JSON responses with status codes and results.

This makes it ideal for building **microservices**, **distributed systems**, or simple **client-server communication** without heavy dependencies.

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/ndk-rpc-engine.git
cd ndk-rpc-engine
npm install
```

---

## 🖥️ Usage

### 1. Server Setup

You can register multiple functions and expose them via the RPC server.

```js
import ndk_rpc_server from "../server/index.mjs";

let server = new ndk_rpc_server({ port: 4000 });

const add = ({a, b}) => a + b;
const subtract = ({a, b}) => a - b;
const hello = () => "Hello, World!";

const isRegistered = await server.register_functions([
  {
    function_name: "add",
    function_block: add,
  },
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
```

**Server Console Output:**

```
Global Registered function: [object Object]
Registered functions: [
  { function_name: 'add', function_block: [Function: add] },
  { function_name: 'subtract', function_block: [Function: subtract] },
  { function_name: 'hello', function_block: [Function: hello] }
]
NDK-RPC-Engine started at port: http://localhost:4000
```

---

### 2. Client Usage

Clients can call any registered function on the server.

```js
import { Client } from "../index.mjs";

const client = new Client({
    server_port: 4000
});

const response = await client.request({
     method : "add",
     params: { a: 5 , b: 4 }
});

console.log("Response from server to Client : " , response);
```

**Client Console Output:**

```
Response from server to Client :  {
  message: 'Method executed successfully',
  method_name: 'add',
  result: 9
}
```

---

## 🛠️ Features

* Simple function registration (`register_functions`).
* JSON-based request/response.
* Built-in error handling (e.g., method not found, invalid params).
* Supports multiple clients.

---

## 📌 Example Methods

* `add({a, b})` → returns sum.
* `subtract({a, b})` → returns difference.
* `hello()` → returns greeting string.

---

## 📖 Roadmap

* [ ] Add WebSocket support for bi-directional communication.
* [ ] Support authentication (JWT/OAuth).
* [ ] Function namespaces for modularity.
* [ ] Middleware hooks (logging, validation, etc.).

---

## 🤝 Contributing

Feel free to fork, open issues, and submit PRs.

---

## 📜 License

MIT License © 2025 Ndk
