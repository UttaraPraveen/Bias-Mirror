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

    // 1. Use your working model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", 
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

    // 2. THE NEW "FRIENDLY" PROMPT
    const prompt = `
      You are a wise, empathetic friend holding up a "Bias Mirror." 
      The user has shared this thought: "${input}"
      
      Your goal is NOT to judge them or prove them wrong. 
      Your goal is to gently show them the hidden complexity they might have missed.
      Use warm, conversational language (like "You might feel...", "It's interesting to consider...").
      
      Fill these fields with that tone:
      
      1. neutral_reframe: "Let's strip away the emotion for a second. At its core, this idea is simply saying..." (Keep it 1 sentence, very calm).
      2. perspectives:
         - affected_individual: How would someone hurt by this opinion feel if they heard it? (Be empathetic).
         - authority: How would a leader or expert view this challenge?
         - societal: What happens if everyone thought this way?
         - ethical: What is the fair thing to do here?
      3. assumptions: List 2 things the user is assuming are true (e.g., "This assumes that...").
      4. bias_mirror: Offer a gentle "What if?" Create a compassionate counter-perspective that invites them to think differently.
      5. bias_tags: Name 2 cognitive biases at play (e.g., "Confirmation Bias"), but keep them standard.
    `;

    const result = await model.generateContent(prompt);
    const data = JSON.parse(result.response.text());

    return NextResponse.json(data);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to analyze text" }, { status: 500 });
  }
}