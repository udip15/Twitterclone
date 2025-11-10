import { GoogleGenAI, Type } from "@google/genai";

// The API key is automatically sourced from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTweetIdeas = async (topic: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 3 short, witty, and engaging tweet ideas about "${topic}". The ideas should be distinct from each other.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ideas: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: "A single tweet idea."
              },
            },
          },
          required: ["ideas"],
        },
      },
    });

    const jsonString = response.text;
    const parsed = JSON.parse(jsonString);

    if (parsed && Array.isArray(parsed.ideas)) {
        return parsed.ideas;
    } else {
        throw new Error("Invalid format received from Gemini API");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate tweet ideas from Gemini API.");
  }
};
