// check-models.js
const API_KEY = "AIzaSyB2_-ScjuXafBANc1d3wLNK9APwsm3KShU"; // Paste your API key here

async function checkModels() {
  console.log("Asking Google for available models...\n");
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await response.json();
    
    if (data.error) {
      console.error("❌ Google returned an error:");
      console.error(data.error.message);
      return;
    }

    if (data.models && data.models.length > 0) {
      console.log("✅ Your API key has access to these models:");
      data.models.forEach(m => console.log(`- ${m.name.replace('models/', '')}`));
    } else {
      console.log("❌ Your API key has access to ZERO models. The list is empty.");
    }
  } catch (err) {
    console.error("Network error:", err);
  }
}

checkModels();