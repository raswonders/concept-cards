import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { fromSerializableHistory } from "@/lib/history";
import { createPrompt } from "@/lib/prompt";
import { CardSchema } from "@/lib/cardSchema";

const modelName = "gpt-4o-2024-08-06";

export async function POST(req: Request) {
  const body = await req.json();

  const conceptsHistory = fromSerializableHistory(body.history);
  const categoryName = body.categoryName;
  let prompt: string;
  if (process.env.NODE_ENV === "development") {
    prompt = "";
  } else {
    prompt = createPrompt(categoryName, conceptsHistory);
  }

  console.log("querying model...");
  console.log({ prompt });
  const { object } = await generateObject({
    model: openai(modelName),
    prompt,
    schema: CardSchema,
    temperature: 0.7,
  });

  return NextResponse.json(object);
}
