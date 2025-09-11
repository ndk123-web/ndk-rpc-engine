import { Client } from "../index.mjs";

async function testClientWithAuth() {
    try {
        console.log("🚀 Testing client with auth flow...");
        
        const client = new Client();
        
        // Initialize with auth
        const authData = await client.init({ server_port: 4000 });
        console.log("✅ Auth initialized:", authData);
        
        // Now make RPC call
        const response = await client.request({
            method: "add",
            params: { a: 5, b: 4 }
        });
        
        console.log("✅ RPC Response:", response);
        
    } catch (error) {
        console.error("❌ Test failed:", error.message);
        console.error("Full error:", error);
    }
}

// Test without auth (current working version)
async function testClientWithoutAuth() {
    try {
        console.log("🚀 Testing client without auth...");
        
        const client = new Client({ server_port: 4000 });
        
        const response = await client.request({
            method: "add",
            params: { a: 5, b: 4 }
        });
        
        console.log("✅ RPC Response:", response);
        
    } catch (error) {
        console.error("❌ Test failed:", error.message);
    }
}

console.log("=== Testing WITH Auth ===");
await testClientWithAuth();

console.log("\n=== Testing WITHOUT Auth ===");
await testClientWithoutAuth();