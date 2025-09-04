# NDK RPC Engine

🚀 A lightweight, fast, and easy-to-use RPC (Remote Procedure Call) engine for Node.js with built-in client and server support.

## Features

- ✅ **Simple Setup** - Get started with just a few lines of code
- ✅ **Client & Server** - Built-in client and server components
- ✅ **Type Flexible** - Support for various parameter types (arrays, objects, primitives)
- ✅ **Error Handling** - Comprehensive error handling and validation
- ✅ **Express Integration** - Built on top of Express.js
- ✅ **CORS Support** - Cross-origin requests supported out of the box
- ✅ **Lightweight** - Minimal dependencies and fast performance

## Installation

```bash
npm install ndk-rpc-engine
```

## Quick Start

### Server Setup

```javascript
import ndk_rpc_server from "ndk-rpc-engine/server";

// Create server instance
const server = new ndk_rpc_server({ port: 4000 });

// Define your functions
const add = ({ a, b }) => a + b;
const subtract = ({ a, b }) => a - b;
const hello = () => "Hello, World!";

// Register functions
await server.register_functions([
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

// Start the server
await server.start();
console.log("🚀 NDK RPC Server is running!");
```

### Client Setup

```javascript
import { Client } from "ndk-rpc-engine/client";

// Create client instance
const client = new Client({
    server_port: 4000 
});

// Call remote functions
const response = await client.request({
    method: "add",
    params: { a: 5, b: 3 }
});

console.log(response.data.result); // Output: 8
```

## API Reference

### Server API

#### `new ndk_rpc_server(options)`

Creates a new RPC server instance.

**Parameters:**
- `options.port` (number, optional) - Server port (default: 3000)

#### `server.register_functions(functions)`

Registers an array of functions to be callable via RPC.

**Parameters:**
- `functions` (Array) - Array of function objects

**Function Object Structure:**
```javascript
{
  function_name: "string", // Unique function name
  function_block: function // The actual function to execute
}
```

**Example:**
```javascript
await server.register_functions([
  {
    function_name: "calculate",
    function_block: ({ operation, a, b }) => {
      if (operation === "add") return a + b;
      if (operation === "multiply") return a * b;
      throw new Error("Unknown operation");
    }
  }
]);
```

#### `server.start()`

Starts the RPC server.

### Client API

#### `new Client(options)`

Creates a new RPC client instance.

**Parameters:**
- `options.server_port` (number, optional) - Server port to connect to (default: 3000)

#### `client.request(options)`

Makes an RPC call to the server.

**Parameters:**
- `options.method` (string) - Name of the remote function to call
- `options.params` (any, optional) - Parameters to pass to the function

**Returns:**
- Promise resolving to server response

**Response Format:**
```javascript
{
  statusCode: 200,
  message: "Method executed successfully",
  data: {
    method_name: "function_name",
    result: "function_result"
  }
}
```

## Examples

### Example 1: Basic Math Operations

**Server:**
```javascript
import ndk_rpc_server from "ndk-rpc-engine/server";

const server = new ndk_rpc_server({ port: 4000 });

const mathOperations = {
  add: ({ a, b }) => a + b,
  subtract: ({ a, b }) => a - b,
  multiply: ({ a, b }) => a * b,
  divide: ({ a, b }) => {
    if (b === 0) throw new Error("Division by zero!");
    return a / b;
  }
};

await server.register_functions([
  { function_name: "add", function_block: mathOperations.add },
  { function_name: "subtract", function_block: mathOperations.subtract },
  { function_name: "multiply", function_block: mathOperations.multiply },
  { function_name: "divide", function_block: mathOperations.divide }
]);

await server.start();
```

**Client:**
```javascript
import { Client } from "ndk-rpc-engine/client";

const client = new Client({ server_port: 4000 });

// Addition
const addResult = await client.request({
  method: "add",
  params: { a: 10, b: 5 }
});
console.log("10 + 5 =", addResult.data.result); // 15

// Division with error handling
try {
  const divResult = await client.request({
    method: "divide",
    params: { a: 10, b: 0 }
  });
} catch (error) {
  console.error("Error:", error.message);
}
```

### Example 2: Array Parameters

```javascript
// Server function
const processArray = (numbers) => {
  return numbers.reduce((sum, num) => sum + num, 0);
};

await server.register_functions([
  { function_name: "sum_array", function_block: processArray }
]);

// Client call
const result = await client.request({
  method: "sum_array",
  params: [1, 2, 3, 4, 5]
});
console.log("Sum:", result.data.result); // 15
```

### Example 3: No Parameters

```javascript
// Server function
const getServerTime = () => new Date().toISOString();

await server.register_functions([
  { function_name: "server_time", function_block: getServerTime }
]);

// Client call
const result = await client.request({
  method: "server_time"
  // No params needed
});
console.log("Server time:", result.data.result);
```

## Error Handling

The engine provides comprehensive error handling:

```javascript
try {
  const response = await client.request({
    method: "nonexistent_function",
    params: { a: 1, b: 2 }
  });
} catch (error) {
  console.error("RPC Error:", error.message);
  // Handle different error types
  if (error.message.includes("not found")) {
    console.log("Function doesn't exist on server");
  }
}
```

## Server Endpoints

When you start the server, these endpoints become available:

- `GET http://localhost:{port}/` - Health check
- `POST http://localhost:{port}/api/v1/rpc/run-rpc-method` - Execute RPC methods

## Configuration

### CORS
The server comes with CORS enabled by default for all origins. Perfect for web applications.

### Express Middleware
Built on Express.js, so you can extend it with additional middleware if needed.

## License

MIT © [Navnath Kadam](https://github.com/ndk123-web)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/ndk123-web/ndk-rpc-engine/issues) on GitHub.

---

Made with ❤️ by [Navnath Kadam](https://github.com/ndk123-web)

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
