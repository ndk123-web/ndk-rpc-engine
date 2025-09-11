// Debug script to test auth endpoint
import fetch from 'node-fetch';

async function debugAuthEndpoint() {
    try {
        console.log("🔍 Testing auth endpoint...");
        
        const response = await fetch('http://localhost:4000/api/v1/rpc/give-auth-code', {
            method: 'GET'
        });
        
        console.log("📡 Response status:", response.status);
        console.log("📡 Response headers:", Object.fromEntries(response.headers));
        
        if (response.ok) {
            const data = await response.json();
            console.log("✅ Success! Auth data:", data);
        } else {
            const errorText = await response.text();
            console.log("❌ Error response:", errorText);
        }
        
    } catch (error) {
        console.error("💥 Fetch error:", error.message);
        console.error("💥 Full error:", error);
    }
}

// Also test the base URL to make sure server is running
async function testServerHealth() {
    try {
        console.log("🔍 Testing server health...");
        const response = await fetch('http://localhost:4000/');
        console.log("📡 Health check status:", response.status);
        if (response.ok) {
            const text = await response.text();
            console.log("✅ Server response:", text);
        }
    } catch (error) {
        console.error("💥 Server not running:", error.message);
    }
}

// Run tests
await testServerHealth();
console.log("\n" + "=".repeat(50) + "\n");
await debugAuthEndpoint();