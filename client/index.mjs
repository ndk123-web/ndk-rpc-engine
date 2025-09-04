class Client {
  server_port = "";

  constructor({ server_port }) {
    this.server_port = server_port || 3000;
  }

  async request({ method, params }) {
    try {
      const server_response = await fetch(
        `http://localhost:${this.server_port}/api/v1/rpc/run-rpc-method`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ method_name: method, params }),
        }
      );
      if (server_response.status !== 200) {
        const errorData = await server_response.json();
        throw new Error(
          `Server error: ${errorData.message || "Unknown error"}`
        );
      }
      const responseData = await server_response.json();
      let { data , message } =  responseData;
      return { message , ...data };
    } catch (err) {
      // DEBUG
      console.log(err);
      throw new Error("Something went wrong while making request to server");
    }
  }
}

export { Client };
