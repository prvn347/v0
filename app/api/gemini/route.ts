import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || "");

    // Detect if the request is related to code generation
    const isCodeRelated =
      /(made|create|generate|UI component|code|example)/i.test(data.prompt);

    // Define schema based on the user's intent
    const schema = isCodeRelated
      ? {
          type: SchemaType.OBJECT,
          properties: {
            componentName: {
              type: SchemaType.STRING,
              description: "The name of the UI component",
              nullable: false,
            },
            description: {
              type: SchemaType.STRING,
              description:
                "A brief explanation of the component's purpose and usage",
              nullable: false,
            },
            code: {
              type: SchemaType.STRING,
              description: "The component's code block",
              nullable: false,
            },
            exampleUsage: {
              type: SchemaType.STRING,
              description: "A sample implementation of the component",
              nullable: false,
            },
          },
          required: ["componentName", "description", "code", "exampleUsage"],
        }
      : {
          type: SchemaType.OBJECT,
          properties: {
            plainText: {
              type: SchemaType.STRING,
              description: "If it's a simple message, respond with plain text.",
            },
          },
          required: ["plainText"],
        };

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema, // Apply schema based on user intent
      },
    });

    // Create dynamic prompt based on detected intent
    const prompt = isCodeRelated
      ? `${data.prompt}. Please return the output in this JSON format:
      {
        "componentName": "The name of the UI component",
        "description": "A brief explanation of the component's purpose and usage",
        "code": "The component's code block",
        "exampleUsage": "A sample implementation of the component"
      }.`
      : `${data.prompt}. Please respond with plain text.`;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    // Send back the response
    return NextResponse.json({
      message: result.response.text(),
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
}
