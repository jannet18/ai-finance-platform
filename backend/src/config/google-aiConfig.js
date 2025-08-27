const { GoogleGenAI } = require("@google/genai");
const { Env } = require("../config/envConfig");

const ai = new GoogleGenAI({ apiKey: Env.GEMINI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

const genAI = main();

module.exports = { genAI, ai };
