const { GoogleGenerativeAI } = require("@google/generative-ai");

// Replace with your actual API key temporarily for testing
const API_KEY = "AIzaSyB2_-ScjuXafBANc1d3wLNK9APwsm3KShU";

const genAI = new GoogleGenerativeAI(API_KEY);

async function testAPI() {
  try {
    console.log("Testing API key...");
    
    // Try different model names
    const models = [
      "gemini-pro",
      "gemini-1.5-flash-latest",
      "models/gemini-1.5-flash",
      "gemini-1.5-flash-001"
    ];
    
    for (const modelName of models) {
      try {
        console.log(`\nTrying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Say hello");
        const response = await result.response;
        const text = response.text();
        console.log(`✅ SUCCESS with ${modelName}!`);
        console.log("Response:", text);
        break;
      } catch (error) {
        console.log(`❌ Failed with ${modelName}:`, error.message);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

testAPI();