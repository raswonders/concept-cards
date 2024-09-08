import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { CardSchema } from "@/app/cardSchema";

const modelName = "gpt-4o-2024-08-06";

export async function POST(req: Request) {
  console.log("querying model...")
  const { object } = await generateObject({
    model: openai(modelName),
    prompt: "Generate nine different words or short phrases",
    schema: CardSchema,
  })

  return NextResponse.json(object);
}