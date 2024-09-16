import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { CardSchema } from "@/app/cardSchema";
import { parseHistory } from "@/lib/history";
import { createPrompt } from "@/lib/prompt";

const modelName = "gpt-4o-2024-08-06";

export async function POST(req: Request) {
  const body = await req.json();
  const conceptsHistory = parseHistory(body);
  const prompt = createPrompt(conceptsHistory);

  console.log("querying model...")
  console.log({ prompt })
  const { object } = await generateObject({
    model: openai(modelName),
    prompt,
    schema: CardSchema,
    temperature: 1,
  })

  return NextResponse.json(object);
}
