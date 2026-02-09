import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key missing" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const { input } = await req.json();

    if (!input) {
      return NextResponse.json({ error: "Input is required" }, { status: 400 });
    }

    // 1. USE YOUR SPECIFIC MODEL
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // <--- Updated to match your list
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            neutral_reframe: { type: SchemaType.STRING },
            perspectives: {
              type: SchemaType.OBJECT,
              properties: {
                affected_individual: { type: SchemaType.STRING },
                authority: { type: SchemaType.STRING },
                societal: { type: SchemaType.STRING },
                ethical: { type: SchemaType.STRING },
              },
              required: ["affected_individual", "authority", "societal", "ethical"],
            },
            assumptions: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
            },
            bias_mirror: { type: SchemaType.STRING },
            bias_tags: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
            },
          },
          required: ["neutral_reframe", "perspectives", "assumptions", "bias_mirror", "bias_tags"],
        },
      },
    });

    const prompt = `
      Analyze the following opinion: "${input}".
      
      Act as a "Bias Mirror". Your goal is to analyze opinionated text and deconstruct it into distinct dimensions without being accusatory.
      
      1. neutral_reframe: A completely emotion-free summary of the core message.
      2. perspectives: Reframe the idea from the lens of an Affected Individual, Authority Figure, Society, and Ethics.
      3. assumptions: List 2 underlying assumptions.
      4. bias_mirror: A "Steel Man" argument—the strongest, most respectful version of the opposing view.
      5. bias_tags: Identify 2 specific cognitive biases (e.g., Framing Effect, Confirmation Bias).
    `;

    const result = await model.generateContent(prompt);
    
    // 2. Parse the JSON response
    const data = JSON.parse(result.response.text());

    return NextResponse.json(data);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to analyze text" }, { status: 500 });
  }
}