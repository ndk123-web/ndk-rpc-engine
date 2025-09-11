class Client {
  server_port = "";

  async init({ server_port }) {
    this.server_port = server_port || 3000;

    // DEBUG
    console.log("SERVER PORT SET TO: ", this.server_port);

    const response = await fetch(
      `http://localhost:${server_port}/api/v1/rpc/give-auth-code`,
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error(`Failed to connect: ${response.status}`);
    }

    const auth_token = await response.json(); //  yahan parse karna hoga
    console.log("Auth Token:", auth_token);

    return { ...auth_token.data };
  }

  async request({ method, params, auth_code }) {
    try {
      const server_response = await fetch(
        `http://localhost:${this.server_port}/api/v1/rpc/run-rpc-method`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ method_name: method, params, auth_code }),
        }
      );
      if (server_response.status !== 200) {
        const errorData = await server_response.json();
        throw new Error(
          `Server error: ${errorData.message || "Unknown error"}`
        );
      }
      const responseData = await server_response.json();
      let { data, message } = responseData;
      return { message, ...data };
    } catch (err) {
      // DEBUG
      console.log("Error:", err);
      throw new Error("Something went wrong while making request to server");
    }
  }
}

export { Client };
